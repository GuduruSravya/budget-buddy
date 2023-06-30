import React,{useState,useContext} from 'react';
import {TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';
import { BudgetBuddyContext } from '../../../context/context';
import {v4 as uuidv4} from 'uuid';
import useStyles from './styles'

const Form = () =>{
    const classes = useStyles();
    const {deleteTransaction,addTransaction} = useContext(BudgetBuddyContext);

    const createTransaction = () =>{
        const transaction={...formData, amount:Number(formData.amount),id:uuidv4()}
        addTransaction(transaction);
        setFormData(inputData);
    }
    const inputData = {
        type:'Income',
        category:'',
        amount:'',
        date:new Date()
    }
    const [formData,setFormData] = useState(inputData);
    
  return(
   <Grid container spacing={2}>
    <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
            ...
        </Typography>
    </Grid>
    <Grid item xs={6}>
        <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} onChange={(e)=>{setFormData({...formData,type:e.target.value})}}>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
            </Select>
        </FormControl>

    </Grid>
    <Grid item xs={6}>
        <FormControl fullWidth>
           <InputLabel>Category</InputLabel>
           <Select value={formData.category} onChange={(e)=>{setFormData({...formData,category:e.target.value})}}>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>

           </Select>
        </FormControl>
    </Grid>
    <Grid item xs={6}>
        <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e)=>{setFormData({...formData,amount:e.target.value})}}/>
    </Grid>
    <Grid item xs={6}>
        <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e)=>{setFormData({...formData,date:e.target.value})}}/>
    </Grid>
    <Button variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>

   </Grid>
  )
}

export default Form