
var budgetButton=document.getElementById("budget-submit")
var budgetInput=document.getElementById("budget-input")
var budgetAmount=document.getElementById("budget-amount")
var balanceAmount=document.getElementById("balance-amount")
var budget=0;
 
budgetButton.addEventListener("click",function(event){
  event.preventDefault();
  budget=budgetInput.value;
  console.log(budget)
  budgetAmount.innerHTML=budget;
  balanceAmount.innerHTML=budget;
  calculateBalance();
})

var expenseButton=document.getElementById("expense-submit")
var expenseInput=document.getElementById("expense-input")
var amountInput=document.getElementById("amount-input")
var expenseAmount=document.getElementById("expense-amount");
var expensevalue=0;
var itemList=[]
var itemID=0;
expenseButton.addEventListener("click",function(event){
  event.preventDefault();
  var expenseReason=expenseInput.value;
  var amount=amountInput.value;
 
  // console.log(expensevalue);
  itemID++;
  let expense={
    reason: expenseReason,
    amount: amount,
    id:itemID
      
  }
  itemList.push(expense); 
  // console.log(expense.id)
  addExpense(expense);
  showExpense();

  calculateBalance();


})

var balanceAmount=document.getElementById("balance-amount")

function totalExpense(){
  var res=0;
  for(let i=0;i<itemList.length;i++){
    res+=parseInt(itemList[i].amount);
  }
  return res;
}
function showExpense(){
  totalexp=totalExpense();
  expenseAmount.innerHTML=totalexp;

}
function calculateBalance(){
  // console.log(budget);
  totalexp=totalExpense();
  console.log(totalexp);

  balanceAmount.innerHTML=parseInt(budget)-parseInt(totalexp);

}

var expenseList=document.getElementById("expense-list");

function addExpense(expense){
  const div=document.createElement("div");
  div.classList.add("expense");
  div.innerHTML=`<div class="expense-item d-flex justify-content-between align-items-baseline">

  <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.reason}</h6>
  <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

  <div class="expense-icons list-item">

   <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
    <i class="fas fa-edit"></i>
   </a>
   <a href="#" class="delete-icon" data-id="${expense.id}">
    <i class="fas fa-trash"></i>
   </a>
  </div>
 </div>`
 expenseList.appendChild(div);
}

function editExpense(element){
  let id=parseInt(element.dataset.id);
  // console.log(id)
  let parent=element.parentElement.parentElement.parentElement;
  expenseList.removeChild(parent);
  let expense=itemList.filter(function(item){
    return item.id === id;
  })
  expenseInput.value=expense[0].reason;
  amountInput.value=expense[0].amount;
  
  let tempList=itemList.filter(function(item){
    return item.id != id;
  })
  itemList=tempList;
  calculateBalance();
  showExpense();
}

function deleteExpense(element){
  let id=parseInt(element.dataset.id);
  // console.log(id)
  let parent=element.parentElement.parentElement.parentElement;
  expenseList.removeChild(parent);
  let tempList=itemList.filter(function(item){
    return item.id != id;
  })
  itemList=tempList;
  calculateBalance();
  showExpense();
}

expenseList.addEventListener("click",function(event){
  console.log(event.target.parentElement)
  console.log(event)
  if(event.target.parentElement.classList.contains("edit-icon")){
    editExpense(event.target.parentElement);
  }
  else if(event.target.parentElement.classList.contains("delete-icon")){
    deleteExpense(event.target.parentElement);
  }
})

