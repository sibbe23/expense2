
        
async function addNewExpense(e){
    try{
    e.preventDefault();

    const expenseDetails = {
        expenseamount : e.target.expenseamount.value,
        description : e.target.description.value,
        category : e.target.category.value,
        income :e.target.income.value
    }
    console.log(expenseDetails)
    const token = localStorage.getItem('token')
   const expense= await axios.post('http://52.90.42.159:4000/expense/addexpense',expenseDetails,{headers:{'Authorization':token}})
    console.log(expense)

}catch(err){console.log(err)}}


function showPremiumuserMessage() {
    try{
    document.getElementById('rzp-button1').style.visibility = "hidden"
    document.getElementById('message').innerHTML = `<h4 class="text-center text-dark"> &nbsp; Premium Activated</h4>`}
    catch(err){console.log(err)}
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
window.addEventListener('DOMContentLoaded',async()=>{
    try{
    const token = localStorage.getItem('token')
    const ltd = localStorage.getItem('row') || 10;
    const page=1;
    const decodeToken = parseJwt(token)
    // console.log(decodeToken)
    const ispremiumuser = decodeToken.ispremiumuser
    if(ispremiumuser){
        showPremiumuserMessage()
        showLeaderboard()
    }
   const response = await axios.get(`http://52.90.42.159:4000/expense/data?page=${page}=${ltd}`,{headers:{'Authorization':token}})
        console.log(response)
        // response.data.expenses.forEach(response=>            addNewExpensetoUI(response)
        // )
        addExpenseToUi(response)
            pagination(response)
        
}catch(err){
    console.log(err)
}})
// function addNewExpensetoUI(expense){
//     // const parentElement = document.getElementById('listOfExpenses');
//     // parentElement.innerHTML += `
//     //     <li id=${expenseElemId}>
//     //         ${expense.expenseamount} - ${expense.category} - ${expense.description}
//     //         <button onclick='deleteExpense(event, ${expense.id})' class="delbtn">
//     //             Delete Expense
//     //         </button>
//     //     </li>`


//     var x = document.getElementsByTagName('tr')
//     var i=0;
//     var txt=""
//     for(i;i<x.length;i++){
//         txt = x[i].rowIndex +1;
//     }
//     const tbodyElem = document.querySelector('tbody')
//     const expenseElemId = `expense-${expense.id}`;
//         tbodyElem.innerHTML +=`<tr id='${expenseElemId}' class="text-dark datas">
//         <td>${txt}</td>
//         <td>${expense.expenseamount}</td>
//         <td>${expense.category}</td>
//         <td>${expense.description}</td>
//         <td>${expense.income}</td>
//         <td> <button class="btn btn-danger"onclick='deleteExpense(event, ${expense.id})' class="delbtn">
//         Delete Expense
//     </button></td>
//     </tr>
//         `
     
// }
function deleteExpense(e,expenseid){
    try{
    const token = localStorage.getItem('token')
    axios.delete(`http://52.90.42.159:4000/expense/deleteexpense/${expenseid}`,{headers:{'Authorization':token}})
    .then(()=>{
        removeExpensefromUI(expenseid);
    })
    .catch(err=>console.log(err))

}
catch(err){
    console.log(err)
}}
function removeExpensefromUI(expenseid){
    try{
    const expenseElemId = `expense - ${expenseid}`;
    document.getElementById(expenseElemId).remove();}
    catch(err){
        console.log(err)
    }
}
document.getElementById('rzp-button1').onclick = async function (e) {
    try{
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://52.90.42.159:4000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id,
     "order_id": response.data.order.id,
     "handler": async function (response) {
        const res = await axios.post('http://52.90.42.159:4000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} })
        
        console.log(res)
         alert('You are a Premium User Now')
         document.getElementById('rzp-button1').style.visibility = "hidden"
         document.getElementById('message').innerHTML = "You are a premium user "
         localStorage.setItem('token', res.data.token)
         showLeaderboard()
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
    console.log(response)
    alert('Something went wrong')
 });
}catch(err){console.log(err)}}
function showLeaderboard(){
    try{
    const inputElement = document.createElement("input")
    inputElement.type = "button"
    inputElement.value = 'Show Leaderboard'
    inputElement.className='btn btn-primary text-white widths'
    inputElement.onclick = async() => {
        inputElement.style.visibility="hidden"
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://52.90.42.159:4000/premium/showLeaderBoard', { headers: {"Authorization" : token} })
        console.log(userLeaderBoardArray)

        var leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML += '<h1 class="text-dark"> Leader Board </h1>'
        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name : ${userDetails.name} &nbsp;&nbsp; Total Expense : ${userDetails.totalExpenses || 0} </li>`
        })
    }
       // <button onclick="download()" id="downloadexpense" class="btn btn-dark text-white widths">Download File </button>
const downloadElem = document.createElement('input')
downloadElem.type='button'
downloadElem.id = 'downloadexpense'
downloadElem.className ='btn btn-primary text-white widths'
downloadElem.value = 'Download File'
const br = document.createElement('br')
const br1 = document.createElement('br')

downloadElem.onclick = async() =>{
download()    
}
    
    document.getElementById("message").appendChild(inputElement);
    document.getElementById('message').appendChild(br)
    document.getElementById('message').appendChild(br1)
    document.getElementById('message').appendChild(downloadElem)
}catch(err){console.log(err)}}

function download(){
    try{
    const token = localStorage.getItem('token')
    axios.get('http://52.90.42.159:4000/expense/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 200){
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            console.log('Error')
        }

    })
    .catch((err) => {
        console.log(err)
    });
}catch(err){console.log(err)}}
const setRow = () => {
    try{
    let row = document.getElementById('rowOptions').value;
    localStorage.setItem("row", row);
  }catch(err){console.log(err)}}
  
  const addExpenseToUi = (response)=>{
    try{
    let expense = response.data.expenses
    // console.log(expense)
    for(let i=0;i<expense.length;i++){
        const tr = document.createElement('tr')
        const th = document.createElement("th");
        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const tbody = document.querySelector('.tbody')
        th.appendChild(document.createTextNode(i + 1));tr.appendChild(th);
        td.appendChild(document.createTextNode(expense[i].expenseamount));tr.appendChild(td);
        td1.appendChild(document.createTextNode(expense[i].category));tr.appendChild(td1);
        td2.appendChild(document.createTextNode(expense[i].description));tr.appendChild(td2);
        td3.appendChild(document.createTextNode(expense[i].income));tr.appendChild(td3)
        td4.innerHTML+=` <button class="btn btn-danger"onclick='deleteExpense(event, ${expense[i].id})'>Delete Expense</button>`
        tr.appendChild(td4);tbody.appendChild(tr)
    }
  }
  catch(err){console.log(err)}}

const pagination = async (response) => {
    try{
    const pagination = document.getElementById('paginations')
    pagination.innerHTML = "";
    if (response.data.hasPreviousPage) 
    {
      const btn = document.createElement("button");
      btn.className = "btn btn-dark"
      btn.innerHTML = response.data.previousPage;
      await btn.addEventListener("click", () =>
       {
        paginatedResults(response.data.previousPage)
       });
      pagination.appendChild(btn);
    }
    const btn1 = document.createElement("button");
    btn1.className = "btn btn-success"
    btn1.innerHTML = `<h3>${response.data.currentPage}</h3>`;
     btn1.addEventListener("click", async() =>
     {
    await paginatedResults(response.data.currentPage)
     });
    pagination.appendChild(btn1);
    if (response.data.hasNextPage)
     {
      const btn2 = document.createElement("button");
      btn2.className = "btn btn-dark"
      btn2.innerHTML = response.data.nextPage;
      btn2.addEventListener("click", async () => 
      {
        await paginatedResults(response.data.nextPage);
      });
      pagination.appendChild(btn2);
    }
  }catch(err){console.log(err)}}
  const token = localStorage.getItem('token')
  const paginatedResults = async(page) => {
    try{
    const ltd = localStorage.getItem("row");
const expense = await axios.get(`http://52.90.42.159:4000/expense/data?page=${page}=${ltd}`, { headers: { 'Authorization': token }})
        console.log(expense)
    await addExpenseToUi(expense)
     await  pagination(expense);

  }    catch(err){console.log(err)}}       
  