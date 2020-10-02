import React from 'react'
import ReactDOM from 'react-dom'
import { Provider,connect } from 'react-redux'
import './index.css'
import { store, changeShow, changeShowPModal, 
         changeShowFModal, selectParam, changeNeedUpdate, 
         selectConsumer, selectDate, selectNewValue, dataChange,
         changeConsF, clearFilter, changeDateF1, changeDateF2 } from './Redux/store'
import { BrowserRouter,Route } from 'react-router-dom'
import AppDrawer from './Components/Drawer'
import ButtonAppBar from './Components/Header'
import AppTable from './Components/Table'
import AppGrafic from './Components/Grafics'
import FormPDialog from './Components/ModalP'
import FormFDialog from './Components/ModalF'

const changeParam = (event,dispatch) => {
  switch (event.target.textContent) {
  case 'Температура': dispatch(selectParam(0)); break; 
  case 'Цена кирпича': dispatch(selectParam(1)); break;
  case 'Потребление': dispatch(selectParam(2)); break;
  default: {}
  }
}

const selectCons = (event,dispatch) => {
  dispatch(selectConsumer(event.target.textContent))  
}

const changeDate = (event,dispatch) => {
  dispatch(selectDate(event.target.value))  
}

const changeNewValue = (event,dispatch) => {
  dispatch(selectNewValue(event.target.value))  
}

const showTable = (dispatch) => {
  dispatch(changeNeedUpdate(true))  
  dispatch(changeShow(false))  
}

const showGrafic = (dispatch) => {
  dispatch(changeNeedUpdate(true))  
  dispatch(changeShow(false))
}

class App extends React.Component { 
  render(){    
    return <div><BrowserRouter>
      <ButtonAppBar 
        openMenu={()=>this.props.dispatch(changeShow(true))}  
      />       
      <AppDrawer
        open={this.props.state.showMenu}
        closeMenu={()=>this.props.dispatch(changeShow(false))}
        openMenu={()=>this.props.dispatch(changeShow(true))}
        navTableClick={()=>showTable(this.props.dispatch)}
        navGraficClick={()=>showGrafic(this.props.dispatch)}        
        changeShowPModal={()=>this.props.dispatch(changeShowPModal(true))}
        changeShowFModal={()=>this.props.dispatch(changeShowFModal(true))}
      >
      </AppDrawer>      
      <Route exact path='/' render={null} />
      <Route path = '/table' render = {(props)=> (
        <AppTable {...props} 
          state={this.props.state}
          position="absolute"
        />)} 
      />
      <Route path = '/grafic' render = {(props)=> (
        <AppGrafic {...props} 
          state={this.props.state}
          position="absolute"
        />)} />
      <FormPDialog 
        state={this.props.state}        
        closePModal={()=>this.props.dispatch(changeShowPModal(false))}        
        onChangeParam={(event)=>changeParam(event,this.props.dispatch)}       
        onChangeCons={(event)=>selectCons(event,this.props.dispatch)}       
        onChangeDate={(event)=>changeDate(event,this.props.dispatch)}
        changeNewValue={(event)=>changeNewValue(event,this.props.dispatch)}
        changeData={()=>this.props.dispatch(dataChange())}
      />
      <FormFDialog 
        state={this.props.state}
        closeFModal={()=>this.props.dispatch(changeShowFModal(false))}
        onChangeActiveCons={(event)=>this.props.dispatch(changeConsF(event.target.getAttribute('value')))}
        onChangeDateF1={(event)=>this.props.dispatch(changeDateF1(event.target.value))}
        onChangeDateF2={(event)=>this.props.dispatch(changeDateF2(event.target.value))}
        clearFilter={()=>this.props.dispatch(clearFilter())}        
      />
    </BrowserRouter></div>
    }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const WApp = connect(mapStateToProps)(App)

ReactDOM.render(
    <Provider store={store}>
      <WApp />
    </Provider>,
  document.getElementById('root'))
