import React from 'react'


const isIncome = Math.round(Math.random());
const SpeechInfoCard = () => {
  return (
    <div style={{textAlign:'center',padding:'0 10%'}}>
        Try saying: <br/>
        Add {isIncome?'Income ':'Expense '} 
        for {isIncome?'$100 ':'$50 '} 
        in category {isIncome?'Business ':'Pets '} salary 
        for {isIncome?'next monday ':'last friday '} 
    </div>
  )
}

export default SpeechInfoCard