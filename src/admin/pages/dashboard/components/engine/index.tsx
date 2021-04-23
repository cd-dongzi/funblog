import React, { useEffect, useRef } from 'react'
import { useEchartsByPie } from '../../hooks'
import { parseSystemObj } from '../../utils'

type Props = {
  name: string
  data: AnyObject
}
interface DashboardEngine {
  (props: Props): JSX.Element | null
}

const DashboardEngine: DashboardEngine = ({ name, data }) => {
  const ref = useRef(null)
  useEchartsByPie({
    ref,
    name,
    data: data ? parseSystemObj(data) : []
  })
  return <div className="dashboard-engine" ref={ref}></div>
}

export default DashboardEngine
