import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AppList from './ListBox'
import Typography from '@material-ui/core/Typography'

export default function FormFDialog(props) {               //выборка нужных потребителей
  let consumers = []
  switch (props.state.selectedParam) {
    case 0: consumers = props.state.data.houses; break;
    case 1: consumers = props.state.data.plants; break;
    case 2: consumers = props.state.data.houses.concat(props.state.data.plants); break;
    default: consumers = []
  }
  let consumerStrings = consumers.map((cons) => {         //массив объектов для ComboBox
    return( 
      cons.Name
    )})

  return (
    <div>      
      <Dialog 
        open={props.state.showFModal} 
        onClose={props.closeFModal} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Параметры</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Здесь можно установить период и выбрать потребителей для отображения в таблице и графиках            
          </DialogContentText>
          <br />
          <Typography>Потребители</Typography>    
          <AppList 
            fullList={consumerStrings}
            checkedList={props.state.activeConsumers}
            onChangeActiveCons={props.onChangeActiveCons}
          />
          <br />
          <Typography>Период</Typography>
          <TextField
            id="date1"
            type="date"
            style={{ width: 200 }}
            value={props.state.filterDate1}
            InputLabelProps={{ shrink: true, }}
            onChange={props.onChangeDateF1}            
          />
          <span>&nbsp;&#247;&nbsp;</span>
          <TextField
            id="date2"
            type="date"
            style={{ width: 200 }}
            value={props.state.filterDate2}
            InputLabelProps={{ shrink: true, }}
            onChange={props.onChangeDateF2}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={props.clearFilter} color="primary" >
            Сбросить фильтр
          </Button>
          <Button onClick={props.closeFModal} color="primary">
            Ok
          </Button>         
        </DialogActions>
      </Dialog>
    </div>
  );
}