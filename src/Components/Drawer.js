import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'
import './../index.css'

export default function AppDrawer(props) {
  return (
    <div>
      <React.Fragment key='left'>       
        <SwipeableDrawer 
          anchor='left' 
          open={props.open} 
          onClose={props.closeMenu}
          onOpen={props.openMenu} >
          <ListItem 
            button key='LinkToTable' 
            onClick={props.navTableClick} >            
            <NavLink to="/table" className = 'clrLink' >Таблица</NavLink>
          </ListItem>                    
          <ListItem  
            button key='LinkToGrafic'
            onClick={props.navGraficClick} >
            <NavLink to="/grafic" className = 'clrLink' >График</NavLink>            
          </ListItem>
          <Divider />          
          <ListItem
            button key='filterModal' 
            onClick={props.changeShowFModal}
          >Фильтр           
          </ListItem>
          <Divider />
          <ListItem
            button key='paramModal' 
            onClick={props.changeShowPModal}
          >Задать параметр
          </ListItem>
        </SwipeableDrawer>
      </React.Fragment>      
    </div>
  )
}