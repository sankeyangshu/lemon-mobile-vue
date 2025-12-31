<template>
  <van-nav-bar
    :title="$t('router.echarts')"
    left-arrow
    fixed
    placeholder
    @click-left="$router.back()"
  />

  <div class="box-border grid w-full gap-4 p-4">
    <div ref="lineChartRef" class="h-87.5" />
    <div ref="barChartRef" class="h-87.5" />
    <div ref="pieChartRef" class="h-87.5" />
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts';
import { onMounted, useTemplateRef } from 'vue';
import { useECharts } from '@/hooks/use-chart';

defineOptions({
  name: 'ECharts',
});

definePage({
  meta: {
    title: 'ECharts 演示',
    i18nKey: 'router.echarts',
  },
});

const lineChartOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
};

const lineChartRef = useTemplateRef('lineChartRef');
const { renderChart: renderLineChart } = useECharts(lineChartRef);

const barChartOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
};

const barChartRef = useTemplateRef('barChartRef');
const { renderChart: renderBarChart } = useECharts(barChartRef);

const pieChartOptions: EChartsOption = {
  title: {
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

const pieChartRef = useTemplateRef('pieChartRef');
const { renderChart: renderPieChart } = useECharts(pieChartRef);

function loadCharts() {
  renderLineChart(lineChartOptions);
  renderBarChart(barChartOptions);
  renderPieChart(pieChartOptions);
}

onMounted(() => {
  loadCharts();
});
</script>
