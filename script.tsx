function buyData(plan){

let phone = prompt("Enter your phone number:");

if(phone){
alert("You are buying " + plan + " for " + phone);
}
}

function showPlans(){

document.getElementById("plans").scrollIntoView();

}