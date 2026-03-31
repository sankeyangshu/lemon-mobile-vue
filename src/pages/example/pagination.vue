<template>
  <van-nav-bar
    :title="$t('router.pagination')"
    left-arrow
    fixed
    placeholder
    @click-left="$router.back()"
  />

  <div
    v-if="status === 'success'"
    ref="parentRef"
    class="h-[calc(100vh-60px)] overflow-auto"
  >
    <div
      :style="{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      }"
    >
      <div
        v-for="virtualItem in rowVirtualizer.getVirtualItems()"
        :key="virtualItem.index"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        }"
      >
        <!-- 加载更多提示 -->
        <div
          v-if="virtualItem.index > articles.length - 1"
          class="flex items-center justify-center py-8"
        >
          <div v-if="hasNextPage" class="flex items-center space-x-2">
            <van-loading type="spinner" size="20" />
            <span
              class="
                text-gray-500
                dark:text-gray-400
              "
            >{{ $t('system.loading') }}</span>
          </div>
          <span
            v-else
            class="
              text-gray-400
              dark:text-gray-500
            "
          >{{ $t('system.noMore') }}</span>
        </div>

        <!-- 文章卡片 -->
        <div v-else class="px-4 pb-4">
          <div
            class="
              overflow-hidden rounded-lg bg-white
              dark:bg-[#1C1C1E]
            "
          >
            <!-- 封面图片 -->
            <div class="h-40 w-full">
              <img
                :src="articles[virtualItem.index].coverImage"
                :alt="articles[virtualItem.index].title"
                class="size-full object-cover"
              >
            </div>

            <!-- 文章内容 -->
            <div class="box-border p-4">
              <!-- 标题 -->
              <h3
                class="
                  mb-2 truncate text-base text-gray-900
                  dark:text-white
                "
              >
                {{ articles[virtualItem.index].title }}
              </h3>

              <!-- 内容摘要 -->
              <p
                class="
                  mb-3 line-clamp-2 text-sm text-gray-400
                  dark:text-gray-500
                "
              >
                {{ articles[virtualItem.index].content }}
              </p>

              <!-- 底部信息 -->
              <div
                class="
                  flex items-center justify-between border-t border-[#EBEDF0] pt-3 text-xs
                  text-gray-400
                  dark:border-[#3a3a3c] dark:text-gray-500
                "
              >
                <div class="flex items-center space-x-3">
                  <!-- 作者 -->
                  <div class="flex items-center space-x-1">
                    <svg-icon icon="heroicons:user-16-solid" class="size-3.5" />
                    <span class="max-w-20 truncate">{{ articles[virtualItem.index].author }}</span>
                  </div>

                  <!-- 浏览量 -->
                  <div class="flex items-center space-x-1">
                    <svg-icon icon="heroicons:eye-16-solid" class="size-3.5" />
                    <span>{{
                      articles[virtualItem.index].views > 999
                        ? `${(articles[virtualItem.index].views / 1000).toFixed(1)}k`
                        : articles[virtualItem.index].views
                    }}</span>
                  </div>

                  <!-- 点赞数 -->
                  <div class="flex items-center space-x-1">
                    <svg-icon icon="heroicons:heart-16-solid" class="size-3.5" />
                    <span>{{ articles[virtualItem.index].likes }}</span>
                  </div>
                </div>

                <!-- 时间 -->
                <div class="flex items-center space-x-1">
                  <svg-icon icon="heroicons:clock-16-solid" class="size-3.5" />
                  <span>{{ formatDate(articles[virtualItem.index].createTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 后台更新提示 -->
  <div
    v-if="isFetchingNextPage"
    class="
      fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-800/90 px-4 py-2
      backdrop-blur-sm
      dark:bg-gray-700/90
    "
  >
    <div class="flex items-center space-x-2">
      <van-loading type="spinner" size="16" />
      <span
        class="
          text-sm text-gray-200
          dark:text-gray-300
        "
      >更新中...</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from '@/api/system/demo';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { isNotNil } from 'es-toolkit';
import { computed, ref, watch } from 'vue';
import { postArticleListAPI } from '@/api/system/demo';

defineOptions({
  name: 'Pagination',
});

definePage({
  meta: {
    title: '分页演示',
    i18nKey: 'router.pagination',
  },
});

// 使用 useInfiniteQuery 进行无限滚动数据加载
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
  queryKey: ['articleList'],
  queryFn: async ({ pageParam }) => postArticleListAPI({ pageNum: pageParam, pageSize: 10 }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    const { pagination } = lastPage;
    return pagination.hasNext ? pagination.pageNum + 1 : undefined;
  },
});

// 展平所有页面的文章列表
const articles = computed<Article[]>(() => data.value?.pages.flatMap((page) => page.list) || []);

// 滚动容器引用
const parentRef = ref<HTMLDivElement | null>(null);

// 配置虚拟滚动器
const rowVirtualizer = useVirtualizer({
  get count() {
    return hasNextPage.value ? articles.value.length + 1 : articles.value.length;
  },
  getScrollElement: () => parentRef.value,
  estimateSize: () => 316, // 估计每个项目的高度（卡片高度 + 间距）
  overscan: 5, // 预渲染的项目数量
});

// 监听滚动位置，触底加载下一页
watch(
  [() => rowVirtualizer.value.getVirtualItems(), articles, hasNextPage, isFetchingNextPage],
  ([virtualItems]) => {
    if (!virtualItems || virtualItems.length === 0) {
      return;
    }

    const lastItem = virtualItems.at(-1);

    if (!isNotNil(lastItem)) {
      return;
    }

    if (lastItem.index >= articles.value.length - 1 && hasNextPage.value && !isFetchingNextPage.value) {
      void fetchNextPage();
    }
  },
  { deep: true },
);

// 格式化日期
function formatDate(date: string) {
  return format(date, 'MM月dd日', { locale: zhCN });
}
</script>
