// 解析system
export const parseSystemObj = (obj: AnyObject) => {
  const names = Object.keys(obj)
  return names
    .map((name) => ({
      name,
      value: obj[name]
    }))
    .sort((a, b) => b.value - a.value)
}

// 解析data
export const parseData = (data: { name: string; value: any }[]) => {
  return data.reduce(
    (obj, item) => {
      obj.legendData.push(item.name)
      obj.seriesData.push(item)
      return obj
    },
    {
      legendData: [],
      seriesData: []
    } as {
      legendData: string[]
      seriesData: any[]
    }
  )
}
