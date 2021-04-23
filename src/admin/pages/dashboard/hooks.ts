import { useEffect } from 'react'
import { echarts } from './echarts'

// 带滚动的饼状图
export const useEchartsScrollByPie = ({ ref, name, data }: { ref: React.MutableRefObject<null>; name: string; data: any }) => {
  useEffect(() => {
    const myEcharts = echarts.init(ref.current as any)
    myEcharts.setOption({
      title: {
        text: `${name}分布图`
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData
      },
      series: [
        {
          name,
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          itemStyle: {
            borderRadius: 5
          },
          emphasis: {
            itemStyle: {
              borderRadius: 5,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    window.addEventListener('resize', () => {
      myEcharts.resize()
    })
  }, [ref, name, data])
}

// 饼状图
export const useEchartsByPie = ({ ref, name, data }: { ref: React.MutableRefObject<null>; name: string; data: any }) => {
  useEffect(() => {
    const myEcharts = echarts.init(ref.current as any)
    myEcharts.setOption({
      title: {
        text: `${name}分布图`
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: {
        name,
        type: 'pie',
        itemStyle: {
          borderRadius: 5
        },
        data
      }
    })
    window.addEventListener('resize', () => {
      myEcharts.resize()
    })
  }, [ref, name, data])
}
