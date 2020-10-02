import * as React from 'react'
import GraficCT from './Grafic1'
import GraficCP from './Grafic2'
import GraficC from './Grafic3'

export default function AppGrafic(props) {  
  if (props.state.needUpdate) {
    return(
      <div>      
        <GraficCT state={props.state} />
        <br />
        <GraficCP state={props.state} />
        <br />
        <GraficC state={props.state} />      
      </div>
    )
} else {
    return (<div />)
}}