import React, { useEffect, useRef } from 'react'
import { useEchartsByPie } from '../../hooks'
import { parseSystemObj } from '../../utils'

type Props = {
  name: string
  data: AnyObject
}
interface DashboardOs {
  (props: Props): JSX.Element | null
}

const DashboardOs: DashboardOs = ({ name, data }) => {
  const ref = useRef(null)
  useEchartsByPie({
    ref,
    name,
    data: data ? parseSystemObj(data) : []
  })
  return <div className="dashboard-os" ref={ref}></div>
}

export default DashboardOs
