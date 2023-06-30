import React from "react";
import Details from './components/details/Details';
import Main from "./components/main/Main";
import './App.css';
import useStyles from './styles';
import {Grid} from '@material-ui/core';
function App(){
    const classes = useStyles();
return(
  <div>
    <Grid className={classes.grid}container spacing={0} alignItems="center" justifyContent="center" style={{height:'100vh'}}>
        <Grid item xs={12} sm={4}>
           <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3}>
           <Main/>
        </Grid>
        <Grid item xs={12} sm={4}>
           <Details title="Expense" />
        </Grid>
    </Grid>
  </div>
);
}

export default App;