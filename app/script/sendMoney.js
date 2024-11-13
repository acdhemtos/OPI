let canvas = document.querySelector("html>body>section.card#sendmoney>canvas");
let labels = document.querySelectorAll('html>body>section.card#sendmoney>div>label');
let reciever = labels[0];
let amount = labels[1];
let pass = labels[2];

function openSendMoney(){
 if(!INTERNET){
  alert("Need Internet to use this mode!");
  return;
 }
 QR = ""
 canvas.style.display = "block";
 startReading("back",canvas,function(){
  document.querySelector("html>body>section.card#sendmoney>div>label:first-child>input").value = QR;
  ABORT_QR = true;
 });
 
 openCard("sendmoney");
}

function closeSendMoney(){
 ABORT_QR = true;
 reciever.querySelector('input').value = "";
 pass.querySelector('input').value = "";
 amount.querySelector('input').value = "";
 openCard("menu");
}

async function sendMoney(){ 
 let recVal = reciever.querySelector('input').value;
 let amtVal = amount.querySelector('input').value;
 amtVal = parseInt(amtVal)
 if(amtVal == NaN){
  amtVal = 0;
 }
 amtVal *= 100;
 amount.querySelector('input').value = amtVal/100;
 
 let passVal = pass.querySelector('input').value;
 
 let transact = await AJAX("../api/sendMoney.php",{"reciever":recVal,"password":passVal,"amount":amtVal});
 alert(transact['msg']);
 closeSendMoney();
}

