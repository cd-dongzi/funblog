import * as echarts from 'echarts/core'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | LegendComponentOption | TitleComponentOption>

// 注册必须的组件
echarts.use([PieChart, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer])

export { echarts }
