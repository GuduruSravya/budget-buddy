import {useContext} from 'react';
import { BudgetBuddyContext } from './context/context';
import { expenseCategories,incomeCategories,resetCategories } from './constants/categories';


const useTransactions = (title) =>{
    resetCategories();

    const {transactions} = useContext(BudgetBuddyContext);

    const transactionsPerType = transactions.filter((t)=>t.type===title);

    const total = transactionsPerType.reduce((acc,currVal)=> acc += currVal.amount,0)

    const categories = (title==="Income")?incomeCategories:expenseCategories;
    

    transactionsPerType.forEach((t) =>{
        const category = categories.find((c)=>c.type===t.category)

        if(category){
            category.amount += t.amount;
        }
    });

    const filteredCategories = categories.filter((c)=>c.amount > 0);

    const chartData = {
        labels: filteredCategories.map((c)=>c.type),
        datasets :[{
            data:filteredCategories.map((c)=>c.amount),
            backgroundColor:filteredCategories.map((c)=>c.color)
        }],
        
    };

    return {total,chartData};
};

export default useTransactions;