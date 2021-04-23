import React, { useEffect, useRef } from 'react'
import { useEchartsByPie } from '../../hooks'
import { parseSystemObj } from '../../utils'

type Props = {
  name: string
  data: AnyObject
}
interface DashboardBrowser {
  (props: Props): JSX.Element | null
}

const DashboardBrowser: DashboardBrowser = ({ name, data }) => {
  const ref = useRef(null)
  useEchartsByPie({
    ref,
    name,
    data: data ? parseSystemObj(data) : []
  })
  return <div className="dashboard-browser" ref={ref}></div>
}

export default DashboardBrowser
