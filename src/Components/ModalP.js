import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {niceDate,getDataStr} from '../Format/format'

export default function FormPDialog(props) {               //выборка нужных потребителей
  let consumers = []
  switch (props.state.selectedParam) {
    case 0: consumers = props.state.data.houses; break;
    case 1: consumers = props.state.data.plants; break;
    case 2: consumers = props.state.data.houses.concat(props.state.data.plants); break;
    default: consumers = []
  }
  let consumerStrings = consumers.map((cons) => {         //массив объектов для ComboBox
    return( 
      {title: cons.Name}
    )})

    const acceptButtonDisable = () => {
    let dis = false
    if (props.state.newValue === undefined) {dis = true}
    if (props.state.newValue === '') {dis = true}
    let obj = getDataStr(props.state)
    let consDates = []
    try {
      switch (obj.type) {
        case 0: consDates = props.state.data.houses[obj.indx].consumptions.map((dt) => {return niceDate(dt.Date)}); break;
        case 1: consDates = props.state.data.plants[obj.indx].consumptions.map((dt) => {return niceDate(dt.Date)}); break;
        default: {}
      }
    }    
    catch {dis = true}
    if (consDates.indexOf(props.state.selectedDate) < 0) {dis = true}
    return dis
    }
  
    const params = [{title: "Температура"}, {title: "Цена кирпича"}, {title: "Потребление"}]  

  return (
    <div>      
      <Dialog 
        open={props.state.showPModal} 
        onClose={props.closePModal} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Параметры</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Здесь можно изменить значение параметра в заданую дату
            <br />
          </DialogContentText>
          <br />
          <Autocomplete
            id="combo-box1"                        
            value={params[props.state.selectedParam]}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Параметр" variant="outlined" />}
            onChange={props.onChangeParam}            
            options={params}
          />
          <br />
          <Autocomplete
            id="combo-box2"
            value={{title: props.state.selectedConsumer}}
            options={consumerStrings}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Потребитель" variant="outlined" />}
            onChange={props.onChangeCons}
          />
          <br />
          <TextField
            id="date"
            label="Дата"
            type="date"
            style={{ width: 300 }}
            defaultValue={props.state.selectedDate} 
            InputLabelProps={{ shrink: true, }}
            onChange={props.onChangeDate}
        />
        <br />
          <TextField            
            margin="dense"
            id="number"
            label="Новое значение"
            type="number"
            style={{ width: 300 }}
            /* fullWidth */
            onChange={props.changeNewValue}            
          />          
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closePModal} color="primary">
            Отмена
          </Button>
          <Button onClick={props.changeData} color="primary" disabled={acceptButtonDisable()}>
            Принять
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}