import type { UseResizeObserverReturn } from '@vueuse/core';
import type { EChartsCoreOption, EChartsInitOpts, SetOptionOpts } from 'echarts';
import type { Ref } from 'vue';
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { echarts } from '@/plugins';
import { useSettingStore } from '@/store/modules/setting';

interface ConfigProps {
  /**
   * init函数基本配置
   * @see https://echarts.apache.org/zh/api.html#echarts.init
   */
  echartsInitOpts?: EChartsInitOpts;
  /**
   * 是否开启过渡动画
   * @default true
   */
  animation?: boolean;
  /**
   * 过渡动画持续时间(ms)
   * @default 300
   */
  animationDuration?: number;
  /**
   * 是否自动调整大小
   * @default true
   */
  autoResize?: boolean;
  /**
   * 防抖时间(ms)
   * @default 300
   */
  resizeDebounceWait?: number;
  /**
   * 最大防抖时间(ms)
   * @default 500
   */
  maxResizeDebounceWait?: number;
}

/**
 * 使用ECharts图表
 * @param domRef - 图表容器
 * @param config - 配置项
 */
export function useECharts(domRef: Ref<HTMLDivElement | HTMLCanvasElement | null>, config: ConfigProps = {}) {
  const {
    echartsInitOpts,
    animation = true,
    animationDuration = 300,
    autoResize = true,
    resizeDebounceWait = 300,
    maxResizeDebounceWait = 500,
  } = config;

  const settingStore = useSettingStore();
  const { isDark, themeMode } = storeToRefs(settingStore);

  /** 图表实例 */
  let chartInstance: echarts.ECharts | null = null;

  /** 图表尺寸变化监听 */
  let resizeObserver: UseResizeObserverReturn | null = null;

  /** 图表配置项 */
  const chartOptions = ref<EChartsCoreOption | null>(null);

  /** Loading 状态控制 */
  function toggleLoading(show: boolean) {
    if (!chartInstance)
      return;

    if (show) {
      const textColor = isDark.value ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)';
      const maskColor = isDark.value ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.85)';
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--app-color-primary').trim();

      chartInstance.showLoading('default', {
        color: primaryColor,
        textColor,
        fontSize: 16,
        maskColor,
      });
    } else {
      chartInstance.hideLoading();
    }
  }

  /** 图表初始化 */
  async function initChart() {
    const dom = domRef.value;

    if (!dom || echarts.getInstanceByDom(dom))
      return;

    const chartTheme = isDark.value ? 'dark' : 'light';

    chartInstance = echarts.init(dom, chartTheme, echartsInitOpts);

    toggleLoading(true);
  }

  /** 图表销毁 */
  function destroyChart() {
    if (autoResize && resizeObserver) {
      resizeObserver.stop();
      resizeObserver = null;
    }

    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
  }

  /**
   * 图表渲染
   * @param options 图表数据集
   * @param opts 图表配置项
   */
  function renderChart(options: EChartsCoreOption, opts: SetOptionOpts = { notMerge: true }) {
    if (!chartInstance)
      return;

    const finalOptions = { ...options, backgroundColor: 'transparent' };
    chartInstance.setOption(finalOptions, opts);
    chartOptions.value = finalOptions;
    toggleLoading(false);
  }

  /**
   * Update chart options
   * @descCN 更新图表配置（合并模式）
   * @param options - Partial chart options to update
   */
  function updateOptions(options: Partial<EChartsCoreOption>) {
    if (!chartInstance || !chartOptions.value)
      return;

    const updatedOptions = { ...chartOptions.value, ...options };
    renderChart(updatedOptions, { notMerge: false });
  }

  /** 调整图表尺寸 */
  function resize() {
    if (!chartInstance)
      return;

    chartInstance.resize({
      animation: {
        duration: animation ? animationDuration : 0,
      },
    });
  }

  /** 防抖处理的resize */
  const resizeDebounceHandler = useDebounceFn(resize, resizeDebounceWait, {
    maxWait: maxResizeDebounceWait,
  });

  /** 重置图表 */
  function resetChart() {
    if (!chartInstance)
      return;

    chartInstance.clear();
  }

  /**
   * 获取图表实例
   */
  function getChartInstance() {
    return chartInstance;
  }

  // 监听主题变化，自动重新初始化图表
  watch(themeMode, async () => {
    if (!chartInstance || !chartOptions.value)
      return;

    // Save current options (保存当前配置)
    const currentOptions = chartOptions.value;

    // Destroy old chart (销毁旧图表)
    destroyChart();

    // Wait for next tick to ensure DOM is ready (等待下一个 tick 确保 DOM 准备好)
    await nextTick();

    // Initialize new chart (初始化新图表)
    await initChart();

    // Re-attach resize observer if needed (如果需要，重新附加 resize observer)
    if (autoResize && domRef.value) {
      resizeObserver = useResizeObserver(domRef.value, resizeDebounceHandler);
    }

    // Render chart with previous options (使用之前的配置项渲染图表)
    renderChart(currentOptions);
  });

  // 组件实例被挂载之后
  onMounted(() => {
    initChart();
    if (autoResize) {
      resizeObserver = useResizeObserver(domRef.value, resizeDebounceHandler);
    }
  });

  // 组件实例被卸载之后
  onUnmounted(() => {
    destroyChart();
  });

  return {
    getChartInstance,
    renderChart,
    updateOptions,
    resetChart,
    toggleLoading,
  };
}
