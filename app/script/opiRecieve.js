let Rsection = document.querySelector("html>body>section.card#opirecieve");
let RcanvasParent = document.querySelector("html>body>section.card#opirecieve>div#canvas");
let Rcanvas = document.querySelector('html>body>section.card#opirecieve>canvas#webcam');

function Rabort(msg,cla){
 Rsection.setAttribute("msg",msg);
 Rsection.classList.add(cla);
}

function Rwrite(msg){
 makeQR(RcanvasParent,msg);
}

function Rread(func){
 startReading("front",Rcanvas,func);
}

function getUserIDkey(amount){
 if(QR=="4"){
  Rabort(messages[4],"red");
  return;
 }
 let msg = QR.split("\n");
 if(msg.length!=2){
  Swrite("4");
  Sabort(messages[4],"red");
  return;
 }
 let sender = msg[0];
 let i = parseInt(msg[1]);
 if(i==NaN || i<0){
  Rwrite("4");
  Rabort(messages[4],"red");
  return;
 }
 let data = await AJAX("../api/startHandshake.php",{"sender":sender,"i":i,"amount":amount});
 if(data['code']!=0){
  Rwrite(data['code'].toString());
  Rabort(messages[parseInt(data['code'])],"red");
  return;
 }
 let hID = data['hID'];
 Rwrite("0\n"+data['i'].toString());
 
}

function openOPIrecieve(){
 if(!INTERNET){
  alert("Need Internet to use this mode!");
  return;
 }
 
 openCard("opirecieve");
 
 let amount = parseFloat(prompt("Enter Amount to Recieve : "));
 if(amount == NaN || amount<=0){
  alert("Invalid Amount");
  closeOPIrecieve();
  return;
 }
 amount = parseInt(amount*100);
 amount = amount.toString();
 Rwrite(window.sessionStorage.username+"\n"+amount);
 Rread(function(){
  getUserIDkey(amount);
 });
}

function closeOPIrecieve(){
 Rsection.classList.remove("green");
 Rsection.classList.remove("red");
 Rsection.removeAttribute("msg");
 openCard("menu");
}

openOPIrecieve();