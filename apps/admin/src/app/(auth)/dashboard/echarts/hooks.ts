import { useResize } from '@funblog/hooks';
import { EChartsCoreOption } from 'echarts/core';
import { useEffect, useRef } from 'react';
import { echarts } from './echarts';

interface PieHookProps<T = any> {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  name: string;
  data: T;
  options?: Partial<EChartsCoreOption>;
}

// 饼状图
export const useEchartsByPie = ({ ref, name, data, options }: PieHookProps) => {
  const chartRef = useRef({
    container: ref,
    chart: null as echarts.ECharts | null,
  });
  chartRef.current.container = ref;
  useEffect(() => {
    chartRef.current.chart = echarts.init(chartRef.current.container.current);
    chartRef.current.chart.setOption({
      title: {
        text: `${name}分布图`,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: {
        name,
        type: 'pie',
        itemStyle: {
          borderRadius: 5,
        },
        data,
      },
      ...options,
    });
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      chartRef.current.chart?.dispose();
    };
  }, [name, data, options]);
  useResize({
    callback: () => {
      chartRef.current.chart?.resize();
    },
  });
};

// 带滚动的饼状图
export const useEchartsScrollByPie = (props: PieHookProps) => {
  useEchartsByPie({
    ...props,
    options: {
      ...(props.options || {}),
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: props.data.legendData,
      },
      series: [
        {
          name: props.name,
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: props.data.seriesData,
          itemStyle: {
            borderRadius: 5,
          },
          emphasis: {
            itemStyle: {
              borderRadius: 5,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    },
  });
};
