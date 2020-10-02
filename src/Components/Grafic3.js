import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import {   
  ValueAxis,
  Chart,
  AreaSeries,  
  LineSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-material-ui'
import { Stack } from '@devexpress/dx-react-chart'
import {niceDate} from './../Format/format'

export default function GraficC(props) {
  let data = []  
  let hs = props.state.data.houses
  let ps = props.state.data.plants
  let ac = []
  if (props.state.activeConsumers.length < 1){                                //если потр. не выбраны, то все
    ac = hs.map(s => {return(s.Name)}).concat(ps.map(s => {return(s.Name)}))
  } else {ac = props.state.activeConsumers}

  let i,j,k = 0
  let obj = {}
  let founded

  for (i = 0; i < hs.length; i++) {                           
    if (ac.indexOf(hs[i].Name) === -1) {continue}
    for (j = 0; j < hs[i].consumptions.length; j++) {
      for (k = 0; k < data.length; k++) {        
        if (hs[i].consumptions[j].Date === data[k].date) {
          data[k]['y'+ hs[i].ConsumerId] = hs[i].consumptions[j].Consumption
          data[k].y = data[k].y + hs[i].consumptions[j].Consumption
          founded = true
        }        
      }
      if (!founded) {
        obj = {}
        obj.date = hs[i].consumptions[j].Date
        obj['y'+ hs[i].ConsumerId] = hs[i].consumptions[j].Consumption
        obj.y = hs[i].consumptions[j].Consumption
        if ((niceDate(obj.date) >= props.state.filterDate1)&&(niceDate(obj.date) <= props.state.filterDate2)) {
          data = data.concat([obj])
        }
      }
    }   
  }
  
  for (i = 0; i < ps.length; i++) {
    if (ac.indexOf(ps[i].Name) === -1) {continue}
    for (j = 0; j < ps[i].consumptions.length; j++) {           
      for (k = 0; k < data.length; k++) {        
        if (ps[i].consumptions[j].Date === data[k].date) {
          data[k]['y'+ ps[i].ConsumerId] = ps[i].consumptions[j].Consumption
          data[k].y = data[k].y + ps[i].consumptions[j].Consumption
          founded = true
        }        
      }
      if (!founded) {
        obj = {}
        obj.date = ps[i].consumptions[j].Date
        obj['y'+ ps[i].ConsumerId] = ps[i].consumptions[j].Consumption
        obj.y = ps[i].consumptions[j].Consumption
        if ((niceDate(obj.date) >= props.state.filterDate1)&&(niceDate(obj.date) <= props.state.filterDate2)) {
          data = data.concat([obj])
        }
      }
    }   
  }
  console.log(ac)
  let series_h = []
  let series_p = []
  let series = []  
  
  if (hs.length > 0) {
    series_h = hs.filter(cons => ac.indexOf(cons.Name) > -1).map(s => {
      return(
        <AreaSeries 
          valueField={"y" + s.ConsumerId} 
          argumentField={"date"}        
          name={s.Name}
          key={s.ConsumerId}
        />
      )
    })
  }

  if (ps.length > 0) {
    series_p = ps.filter(cons => ac.indexOf(cons.Name) > -1).map(s => {
      return(
        <AreaSeries 
          valueField={"y" + s.ConsumerId} 
          argumentField={"date"}         
          name={s.Name}
          key={s.ConsumerId}
        />
      )
    })
  }
  series = series_h.concat(series_p)

  const stacks = [{series: []}]
  
  if (hs.length > 0) {series_h = hs.map(s => {return s.Name})}
  if (ps.length > 0) {series_p = ps.map(s => {return s.Name})}
  
  stacks[0].series = series_h.concat(series_p)

  return(
  <Paper>
    <Chart
      data={data}
    >
      <Title text="Общий график энергопотребления города" />           
      <ValueAxis />
      {series}
      <LineSeries 
        valueField={"y"} 
        argumentField={"date"}
        name='Общее потребление'
        color="black"
      />    
      <Legend position="right" />            
      <Stack stacks={stacks} />
    </Chart>
  </Paper>
  )
}