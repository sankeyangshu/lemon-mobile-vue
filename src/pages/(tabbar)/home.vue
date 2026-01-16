<template>
  <div class="box-border px-3">
    <div class="mx-auto mt-25 mb-10 size-25">
      <SvgIcon local-icon="icon-logo" class="size-full!" />
    </div>
    <div class="my-2.5 box-border w-full rounded-xl px-5 py-3 text-lg">
      <a
        class="flex items-center justify-center leading-9"
        href="https://github.com/sankeyangshu/lemon-mobile-vue"
      >
        <div class="font-bold">Lemon-Mobile-Vue</div>
        <SvgIcon icon="mdi:github" class="ml-2 text-2xl" />
      </a>
      <div class="mt-3 mb-1.5 text-center text-sm/6">
        {{ t('home.info') }}
      </div>
    </div>

    <div class="mt-4 grid gap-3 pb-6 text-center text-sm">
      <div
        v-for="(item, index) in contentList"
        :key="item"
        :ref="(el) => setItemRef(el as HTMLDivElement, index)"
        class="
          box-border w-full scale-80 truncate rounded-xl border border-solid border-[#424242] p-3
          opacity-0
        "
        :style="{
          '--tw-enter-scale': '0.8',
          '--tw-enter-translate-y': '20px',
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUpdate, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

definePage({
  meta: {
    title: '首页',
    i18nKey: 'router.home',
  },
});

const { t } = useI18n();

const contentList = computed(() => [
  `👑 ${t('home.vue')}`,
  `🍕 ${t('home.typescript')}`,
  `✨ ${t('home.vant')}`,
  `🌀 ${t('home.tailwind')}`,
  `🔥 ${t('home.pinia')}`,
  `🚀 ${t('home.router')}`,
  `🌠 ${t('home.hooks')}`,
  `🎉 ${t('home.utils')}`,
  `👏 ${t('home.icons')}`,
  `🔧 ${t('home.eslint')}`,
  `🎨 ${t('home.git')}`,
  `🌓 ${t('home.theme')}`,
  `👓 ${t('home.axios')}`,
  `🚀 ${t('home.loading')}`,
  `🔒 ${t('home.auth')}`,
]);

const itemRefs = ref<(HTMLDivElement | null)[]>([]);
const animatedIndexes = ref(new Set<number>());
const isInitialLoad = ref(true);
const initialVisibleIndexes = ref<number[]>([]);
let observer: IntersectionObserver | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

function setItemRef(el: HTMLDivElement, index: number) {
  if (el) {
    itemRefs.value[index] = el;
  }
}

onBeforeUpdate(() => {
  itemRefs.value = [];
});

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = itemRefs.value.indexOf(entry.target as HTMLDivElement);

        if (entry.isIntersecting && !animatedIndexes.value.has(index)) {
          animatedIndexes.value.add(index);

          let delay = 0;

          if (isInitialLoad.value) {
            const positionInInitial = initialVisibleIndexes.value.indexOf(index);
            if (positionInInitial !== -1) {
              delay = positionInInitial * 100;
            }
          }

          setTimeout(() => {
            const element = entry.target as HTMLElement;
            element.classList.remove('opacity-0', 'scale-80');
            element.classList.add('animate-in', 'fade-in', 'zoom-in', 'slide-in-from-bottom', 'duration-500');
          }, delay);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  itemRefs.value.forEach((ref, index) => {
    if (ref) {
      const rect = ref.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        initialVisibleIndexes.value.push(index);
      }
      observer!.observe(ref);
    }
  });

  timer = setTimeout(() => {
    isInitialLoad.value = false;
  }, initialVisibleIndexes.value.length * 100 + 500);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (timer) {
    clearTimeout(timer);
  }
});
</script>
