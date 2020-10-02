import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import FilterListIcon from '@material-ui/icons/FilterList'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui'

export default function GraficCT(props) {
  let data = []  
  let obj = {} 
  let ps = {size: 3}
  props.state.data.houses.forEach(h => {
    data = data.concat(h.consumptions.map((cons) => {
      obj = []
      obj['x'+ h.ConsumerId] = cons.Weather
      obj['y'+ h.ConsumerId] = cons.Consumption      
      return(obj)
    }))
  })
  let series = props.state.data.houses.map(s => {
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
      <Legend position="right" >
        <FilterListIcon position="absolute" />
      </Legend>
      <Title text="Зависимость энергопотребления жилых зданий от температуры наружного воздуха" />
    </Chart>
  </Paper>
  )
}