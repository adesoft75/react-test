import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import FilterListIcon from '@material-ui/icons/FilterList'
import {niceDate} from './../Format/format'

export default function AppTable(props) {   
  let data = []
  if (props.state.needUpdate) {
  props.state.data.houses.forEach(house => {
    data = data.concat(house.consumptions.map((str) => {
      return(
      <TableRow key={house.ConsumerId}>
        <TableCell component="th" scope="house" size="small" >{house.ConsumerId}</TableCell>                
        <TableCell align="left">{house.Name}</TableCell>                
        <TableCell align="left">{niceDate(str.Date)}</TableCell>
        <TableCell align="center">{str.Weather}</TableCell>
        <TableCell align="center">-</TableCell>
        <TableCell align="right">{str.Consumption}</TableCell>
      </TableRow>
      )
    }))
  })
  props.state.data.plants.forEach(plant => {
    data = data.concat(plant.consumptions.map((str) => {
      return(
      <TableRow key={plant.ConsumerId}>
        <TableCell component="th" scope="plant" size="small" >{plant.ConsumerId}</TableCell>                
        <TableCell align="left">{plant.Name}</TableCell>                
        <TableCell align="left">{niceDate(str.Date)}</TableCell>
        <TableCell align="center">-</TableCell>
        <TableCell align="center">{str.Price}</TableCell>
        <TableCell align="right">{str.Consumption}</TableCell>
      </TableRow>
      )
    }))
  })  
}
  
  return (
    <TableContainer component={Paper}>
      <Table className='table' size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell size="small">№ потребителя</TableCell>
            <TableCell align="left">Потребитель {/* <FilterListIcon /> */}</TableCell>
            <TableCell align="left">Дата {/* <FilterListIcon /> */}</TableCell>
            <TableCell align="center">Температура</TableCell>
            <TableCell align="center">Цена кирпича</TableCell>
            <TableCell align="right">Потребление</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data}                  
        </TableBody>
      </Table>
    </TableContainer>
  );
}