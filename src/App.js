import React,{useRef,useEffect} from "react";
import Details from './components/details/Details';
import Main from "./components/main/Main";
import './App.css';
import useStyles from './styles';
import {Grid} from '@material-ui/core';
import { useSpeechContext,SpeechState } from '@speechly/react-client';
import microphone from '../src/images/microphone.png';



function App(){
    const classes = useStyles();
    const {listening,attachMicrophone,start,stop,speechState} = useSpeechContext();
    const main = useRef();
    const handleClick = async () => {
      if (listening) {
        await stop();
      } else {
        await attachMicrophone();
        await start();
      }
    };
    const executeScroll = ()=>{
      main.current.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(()=>{
      if(listening){
         executeScroll();
      }
    },[listening])
return(
  <div>
    <Grid className={classes.grid}container spacing={0} alignItems="center" justifyContent="center" style={{height:'100vh'}}>
    <Grid item xs={12} sm={12} md={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} sm={12} md={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={12} md={4}className={classes.last}>
          <Details title="Expense" />
   </Grid>
   <Grid item xs={12} sm={12}>
      <div className={`speechly__div ${listening?'speechly__div-active':''}`}>
      
      <button onClick={handleClick} className="speechly__button">
       <img src={microphone} alt="microphone" />
      </button>
        </div>
   </Grid>
     
        
        
    </Grid>
  </div>
);
}

export default App;