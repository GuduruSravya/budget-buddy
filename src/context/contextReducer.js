const contextReducer =(state,action)=>{
    let transactions;
    switch(action.type){
        case 'DELETE_TRANSACTION':
            console.log(action.payload);
            state.map((t)=>console.log(t.id));
            transactions = state.filter((t)=>t.id!==action.payload);
            return transactions;
        case 'ADD_TRANSACTION':
            transactions = [action.payload,...state];
            return transactions;
            
        default:
            return state;
            
    }
   

}

export default contextReducer;