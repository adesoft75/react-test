import { createStore } from 'redux'
import data from './data.json'
import {niceDate, getDataStr} from './../Format/format'

const initialState = {
  data: data,    
  showMenu: false,
  showPModal: false,
  showFModal: false,
  needUpdate: false,
  selectedParam: 2,
  selectedConsumer: '',
  newValue: undefined,
  selectedDate: niceDate(data.houses[0].consumptions[0].Date), 
  minDate: niceDate(data.houses[0].consumptions[0].Date),
  maxDate: niceDate(data.houses[0].consumptions[data.houses[0].consumptions.length-1].Date),
  filterDate1 : niceDate(data.houses[0].consumptions[0].Date),
  filterDate2 : niceDate(data.houses[0].consumptions[data.houses[0].consumptions.length-1].Date),
  activeConsumers: []  
}

export const changeText = (text) => {
  return {
    type: 'CHANGE',
    payload: text
  }
}

export const changeShow = (showMenu) => {
  return {
    type: 'SHOWMENU',
    payload: showMenu
  }
}

export const changeShowPModal = (isPModalShow) => {
  return {
    type: 'SHOWPMODAL',
    payload: isPModalShow
  }
}

export const changeShowFModal = (isFModalShow) => {
  return {
    type: 'SHOWFMODAL',
    payload: isFModalShow
  }
}

export const selectParam = (param) => {
  return {
    type: 'SELECTPARAM',
    payload: param
  }
}

export const selectConsumer = (cons) => {
  return {
    type: 'SELECTCONSUMER',
    payload: cons
  }
}

export const selectNewValue = (value) => {
  return {
    type: 'SELECTNEWVALUE',
    payload: value
  }
}

export const selectDate = (date) => {
  return {
    type: 'SELECTDATE',
    payload: date
  }
}

export const dataChange = () => {
  return {
    type: 'CHANGEDATA'    
  }
}

export const changeNeedUpdate = (need) => {
  return {
    type: 'CHANGENEEDUPDATE',
    payload: need    
  }
}

export const changeConsF = (name) => {  
  return {
    type: 'CHECKCONSF',
    payload: name    
  }
}

export const changeDateF1 = (date) => {  
  return {
    type: 'CHANGEDATEF1',
    payload: date    
  }
}

export const changeDateF2 = (date) => {  
  return {
    type: 'CHANGEDATEF2',
    payload: date    
  }
}

export const clearFilter = () => {  
  return {
    type: 'CLEARFILTER'       
  }
}

const AppReducer = (state, action) => {
  const obj = getDataStr(state)  
  switch (action.type) {
    case 'CHANGE': return{...state, t1: action.payload};    
    case 'SHOWMENU': return{...state, showMenu: action.payload, needUpdate: (action.payload)?(false):(state.needUpdate)};
    case 'SHOWPMODAL': return{...state, showMenu: false, showPModal: action.payload, needUpdate: !action.payload};
    case 'SHOWFMODAL': return{...state, showMenu: false, showFModal: action.payload, needUpdate: !action.payload};
    case 'SELECTPARAM': return{
      ...state, 
      selectedParam: action.payload, 
      selectedConsumer: ''
    };
    case 'SELECTCONSUMER': return{...state, selectedConsumer: action.payload};
    case 'SELECTNEWVALUE': return{...state, newValue: action.payload};
    case 'SELECTDATE': return{...state, selectedDate: action.payload};
    case 'CHANGENEEDUPDATE': return{...state, needUpdate: action.payload};
    case 'CLEARFILTER': return{...state, activeConsumers: [], filterDate1: state.minDate, 
      filterDate2: state.maxDate, showFModal: false};
    case 'CHANGEDATEF1':            
      if ((action.payload < state.minDate)|
        (action.payload > state.maxDate|(action.payload > state.filterDate2))) {return state}    //***call error
        else {return{...state, filterDate1: action.payload}};
    case 'CHANGEDATEF2': 
      if ((action.payload < state.minDate)|
        (action.payload > state.maxDate)|
        (action.payload < state.filterDate1)) {return state}                                   //***call error
        else {return{...state, filterDate2: action.payload}};
    case 'CHANGEDATA': 
      switch (state.selectedParam) {        
        case 0: 
          state.data.houses[obj.indx].consumptions[obj.dtst].Weather = state.newValue; break
        case 1:
          state.data.plants[obj.indx].consumptions[obj.dtst].Price = state.newValue; break
        case 2:
          switch (obj.type) {
            case 0: state.data.houses[obj.indx].consumptions[obj.dtst].Consumption = state.newValue; break
            case 1: state.data.plants[obj.indx].consumptions[obj.dtst].Consumption = state.newValue; break
            default: {return state}
          } break
        default: {return state}
      }
      return{...state, data: state.data, showPModal: false};    
    case 'CHECKCONSF': {
      let arr = state.activeConsumers
      if (arr.indexOf(action.payload) === -1) {
        arr.splice(0, 0, action.payload)
      } else {
        arr.splice(arr.indexOf(action.payload),1)
      }      
      return{...state, activeConsumers: arr}}; 
    default: return state;
  }      
}

export const store = createStore(AppReducer,initialState)