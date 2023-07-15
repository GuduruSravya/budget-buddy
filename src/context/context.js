import React, {useReducer,createContext} from 'react';
import contextReducer from './contextReducer';
const initState = JSON.parse(localStorage.getItem('transactions')) || [];
export const BudgetBuddyContext = createContext(initState);


export const Provider=({children}) =>{

    const [transactions,dispatch] = useReducer(contextReducer,initState);

    const deleteTransaction = (id)=>{
        dispatch({type:'DELETE_TRANSACTION',payload:id})
    }

    const addTransaction = (transaction)=>{
        dispatch({type:'ADD_TRANSACTION',payload:transaction})
    }

    const balance = transactions.reduce((acc,currVal)=>{
        return (currVal.type==='Expense')?acc -= currVal.amount:acc+=currVal.amount
    },0);
    
    return(
        <BudgetBuddyContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </BudgetBuddyContext.Provider>
    )
}