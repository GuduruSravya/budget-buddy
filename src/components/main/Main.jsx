import React, { useContext } from 'react';
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from '@material-ui/core';
import Form from './form/Form';
import List from './list/List';
import { BudgetBuddyContext } from '../../context/context';

const Main = () =>{
    const {balance} = useContext(BudgetBuddyContext);
    return(
      <Card>
        <CardHeader title="Budget Buddy" subheader="Powered by speechly"/>
        <CardContent>
            <Typography align="center" variant='h5'>Total Balance ${balance}</Typography>
            <Typography variant="subtitle1" style={{lineHeight:'1.5rem',marginTop:'20px'}}>
               Try saying: Add income for $100 in category salary for monday...
            </Typography>
            <Divider/>
            <Form/>
        </CardContent>

        <CardContent>
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