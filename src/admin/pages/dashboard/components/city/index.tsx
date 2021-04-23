import React, { useRef } from 'react'
import { useEchartsScrollByPie } from '../../hooks'
import { parseSystemObj, parseData } from '../../utils'

type Props = {
  name: string
  data: AnyObject
}
interface DashboardCity {
  (props: Props): JSX.Element | null
}

const DashboardCity: DashboardCity = ({ data, name }) => {
  const ref = useRef(null)
  useEchartsScrollByPie({
    ref,
    name,
    data: data ? parseData(parseSystemObj(data)) : []
  })
  return <div className="dashboard-city" ref={ref}></div>
}

export default DashboardCity
