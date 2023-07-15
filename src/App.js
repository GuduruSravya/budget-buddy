import React from "react";
import Details from './components/details/Details';
import Main from "./components/main/Main";
import './App.css';
import useStyles from './styles';
import {Grid} from '@material-ui/core';
import { useSpeechContext } from '@speechly/react-client';
import microphone from '../src/images/microphone.png';



function App(){
    const classes = useStyles();
    const {listening,attachMicrophone,start,stop} = useSpeechContext();
    const handleClick = async () => {
      if (listening) {
        await stop();
      } else {
        await attachMicrophone();
        await start();
      }
    };
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

      <div className={`speechly__div ${listening?'speechly__div-active':''}`}>
      
      <button onClick={handleClick} className="speechly__button">
       <img src={microphone} alt="microphone" />
      </button>
        </div>
        
        
    </Grid>
  </div>
);
}

export default App;