import React, { useContext } from 'react';
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from '@material-ui/core';
import Form from './form/Form';
import List from './list/List';
import SpeechInfoCard from '../SpeechInfoCard';
import { BudgetBuddyContext } from '../../context/context';
import useStyles from './styles';

const Main = () =>{
    const classes = useStyles();
    const {balance} = useContext(BudgetBuddyContext);
    return(
      <Card className={classes.root}>
        <CardHeader title="Budget Buddy" subheader="Powered by speechly"/>
        <CardContent>
            <Typography align="center" variant='h5'>Total Balance ${balance}</Typography>
            <Typography variant="subtitle1" style={{lineHeight:'1.5rem',marginTop:'20px'}}>
               <SpeechInfoCard/>
            </Typography>
            <Divider className={classes.divider}/>
            <Form/>
        </CardContent>

        <CardContent className={classes.cartContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List/>
                </Grid>
            </Grid>
        </CardContent>

      </Card>
    )
}

export default Main;