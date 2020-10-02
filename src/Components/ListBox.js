import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 150,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function AppList(props) {
  const classes = useStyles();  
  return (
    <List 
      className={classes.root} 
      subheader={<li />}
      dense={true}
    >      
      <li className={classes.listSection} >
        <ul className={classes.ul}>            
          {props.fullList.map((item) => (
            <ListItem key={`item-${0}-${item}`}>
              <ListItemText primary={item} />
              <Checkbox 
                checked={props.checkedList.indexOf(item) > -1}                
                value={item}
                onClick={props.onChangeActiveCons}                
              />
            </ListItem>
          ))}
        </ul>
      </li>
      
    </List>
  )
}