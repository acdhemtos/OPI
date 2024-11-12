messages = [
 "",
 "Transaction Successful!",
 "Insufficient Balance.",
 "Cannot Verify.",
 "Invalid Communication."
];

INTERNET = true
INTERVAL = null

function die(){
 alert("Login Required.");
 document.querySelector("html>body>section.card#menu>div>a").click();
}

async function stillIN(){
 let data = await AJAX("../api/stillIN.php",{"code":window.sessionStorage.code});
 if(data['login']==0){
  die();
 }
}

async function updateBalance(){
 let data = await AJAX("../api/getBalance.php",{});
 document.querySelector("html>body>section.card#menu>div>span").innerHTML = data["balance"]/100;
}

function openCard(id){
 let allOpen = document.querySelectorAll("html>body>section.card.visible");
 for(let i=0;i<allOpen.length;i++){
  allOpen[i].classList.remove('visible');
 }
 document.querySelector("html>body>section.card#"+id).classList.add('visible');
}
openCard("menu");