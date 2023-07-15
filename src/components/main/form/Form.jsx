import React,{useState,useEffect,useContext} from 'react';
import {TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';
import { BudgetBuddyContext } from '../../../context/context';
import {v4 as uuidv4} from 'uuid';
import formatDate from '../../../utils/formatDate';
import { incomeCategories,expenseCategories } from '../../../constants/categories';
import useStyles from './styles';
import { useSpeechContext } from '@speechly/react-client';
import Info from '../../Info/Info';

const Form = () =>{
    const classes = useStyles();
    const {deleteTransaction,addTransaction} = useContext(BudgetBuddyContext);
    const {segment} = useSpeechContext();
    const [open,setOpen] = useState(false);

    const createTransaction = () =>{
        if(formData.amount === '' || formData.category==='') 
            return;
        const transaction={...formData, amount:Number(formData.amount),id:uuidv4()}
        setOpen(true);
        addTransaction(transaction);
        setFormData(inputData);
    }

    useEffect(()=>{
        if(segment){
            if(segment.intent.intent === 'add_expense'){
                setFormData({...formData,type:'Expense'});
            }
            else if(segment.intent.intent === 'add_income'){
                setFormData({...formData,type:'Income'});
            } else if(segment.isFinal && segment.intent.intent==='create_transaction'){
                return createTransaction();
            }else if(segment.isFinal && segment.intent.intent==='cancel_transaction'){
                return setFormData(inputData);
            }

            segment.entities.forEach((e)=>{
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch(e.type){
                    case 'amount':
                        setFormData({...formData,amount:e.value});
                        break;
                    case 'category':
                        if(incomeCategories.map((c)=>c.type).includes(category)){
                            setFormData({...formData,type:'Income',category});
                        } else if(expenseCategories.map((c)=>c.type).includes(category)){
                            setFormData({...formData,type:'Expense',category});
                        }
                        
                        break;
                    case 'date':
                        setFormData({...formData,date:e.value});
                        break;
                    default:
                        break;
                    
                }
            });

            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date){
                createTransaction();
            }
        }
    },[segment]);
    const inputData = {
        type:'Income',
        category:'',
        amount:'',
        date:formatDate(new Date())
    }

    
    const [formData,setFormData] = useState(inputData);
    const selectedCategories = (formData.type==="Income")?incomeCategories:expenseCategories;
    
  return(
   <Grid container spacing={2}>
    <Info open={open} setOpen={setOpen}/>
    <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
            {segment && segment.words.map((w)=>w.value).join(" ")}
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
            {
                selectedCategories.map((category)=>
                    <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>
                )
            }
            

           </Select>
        </FormControl>
    </Grid>
    <Grid item xs={6}>
        <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e)=>{setFormData({...formData,amount:e.target.value})}}/>
    </Grid>
    <Grid item xs={6}>
        <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e)=>{setFormData({...formData,date:formatDate(e.target.value)})}}/>
    </Grid>
    <Button className={classes.button}variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>

   </Grid>
  )
}

export default Form