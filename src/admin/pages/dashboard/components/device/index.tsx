import React, { useEffect, useRef } from 'react'
import { useEchartsScrollByPie } from '../../hooks'
import { parseSystemObj, parseData } from '../../utils'

type Props = {
  name: string
  data: AnyObject
}
interface DashboardDevice {
  (props: Props): JSX.Element | null
}

const DashboardDevice: DashboardDevice = ({ name, data }) => {
  const ref = useRef(null)
  useEchartsScrollByPie({
    ref,
    name,
    data: data ? parseData(parseSystemObj(data)) : []
  })
  // useEffect(() => {
  //   const myEcharts = echarts.init(ref.current as any)
  //   myEcharts.setOption({
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       top: '5%',
  //       left: 'center'
  //     },
  //     series: [
  //       {
  //         name: '设备',
  //         type: 'pie',
  //         radius: ['40%', '70%'],
  //         label: {
  //           show: false,
  //           position: 'center'
  //         },
  //         data: [
  //           { value: 30, name: 'PHONE' },
  //           { value: 20, name: 'IPAD' },
  //           { value: 40, name: 'PC' }
  //         ]
  //       }
  //     ]
  //   })
  //   window.addEventListener('resize', () => {
  //     myEcharts.resize()
  //   })
  // }, [])
  return <div className="dashboard-device" ref={ref}></div>
}

export default DashboardDevice
