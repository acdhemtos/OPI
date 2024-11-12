let Ssection = document.querySelector("html>body>section.card#opisend");
let ScanvasParent = document.querySelector("html>body>section.card#opisend>div#canvas");
let Scanvas = document.querySelector('html>body>section.card#opisend>canvas#webcam');

function Sabort(msg,cla){
 Ssection.setAttribute("msg",msg);
 Ssection.classList.add(cla);
}

function Swrite(msg){
 makeQR(ScanvasParent,msg);
}

function Sread(func){
 startReading("front",Scanvas,func);
}

function verifyUsernameAmount(amount){
 let msg = QR.split("\n");
 if(msg.length!=2){
  Swrite("4");
  Sabort(messages[4],"red");
  return;
 }
 let reciever = msg[0];
 if(msg[1]!=amount){
  Swrite("4");
  Sabort(messages[4],"red");
  return;
 }
 
 Swrite(window.sessionStorage.username+"\n"+window.sessionStorage.i);
 Sread(function(){
  verifyKey(reciever,amount);
 });
}

function openOPIsend(){
 if(!INTERNET){
  alert("Need Internet to use this mode!");
  return;
 }

 openCard("opisend");
 
 let amount = parseFloat(prompt("Enter Amount to Send : "));
 if(amount == NaN || amount<=0){
  alert("Invalid Amount");
  closeOPIsend();
  return;
 }
 amount = parseInt(amount*100);
 amount = amount.toString();
 Sread(function(){
  verifyUsernameAmount(amount);
 });
}

function closeOPIsend(){
 Ssection.classList.remove("green");
 Ssection.classList.remove("red");
 Ssection.removeAttribute("msg");
 openCard("menu");
}
