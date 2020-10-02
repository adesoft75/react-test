import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui'

export default function GraficCP(props) {
  let data = []  
  let obj = {} 
  let ps = {size: 3}
  props.state.data.plants.forEach(h => {
    data = data.concat(h.consumptions.map((cons) => {
      obj = []
      obj['x'+ h.ConsumerId] = cons.Price
      obj['y'+ h.ConsumerId] = cons.Consumption      
      return(obj)
    }))
  })
  let series = props.state.data.plants.map(s => {
    return(
      <ScatterSeries 
        valueField={"y" + s.ConsumerId} 
        argumentField={"x" + s.ConsumerId} 
        point={ps}
        name={s.Name}
        key={s.ConsumerId}
      />
    )
  })
  return(
  <Paper>
    <Chart
      data={data}
    >
      <ArgumentAxis />
      <ValueAxis />
      {series}
      <Legend position="right" />      
      <Title text="Зависимость энергопотребления кирпичных заводов от цены на кирпич" />
    </Chart>
  </Paper>
  )
}