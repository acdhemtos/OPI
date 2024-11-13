Rsection = document.querySelector("html>body>section.card#opirecieve");
RcanvasParent = document.querySelector("html>body>section.card#opirecieve>div#canvas");
Rcanvas = ""

try {
 Rcanvas = document.querySelector('html>body>section.card#opirecieve>canvas#webcam');
}catch(err) {
  console.log(err);
}

RFreset = false;
let RFS = undefined;

RcanvasParent.onclick = function(){alert(RLOGS);};

function Rwrite(msg,name){
 RLOGS += "WRITING : "+name+" : "+msg+"\n";
 makeQR(RcanvasParent,msg);
}

function Rread(func){
 startReading("front",Rcanvas,func);
}

function Rabort(msg,cla){
 Rsection.setAttribute("msg",msg);
 Rsection.classList.add(cla);
}
RLOGS = ""

function rlog(msg){
 RLOGS +="READING : "+msg+" : "+QR+"\n";
}

async function finishHandShake(hID){
 RFS = undefined;
 RFreset = true;
 rlog("finishHandShake 0");
 if(QR=="3" || QR=="4"){
  Rabort(messages[QR.toString()],"red");
  return;
 }
 let data = await AJAX("../api/finishHandshake.php",{"id":hID,"hash":QR});
 let code = data['code'].toString();
 Rwrite(code,"finishHandShake 1");
 code = parseInt(code);
 let mode = "red";
 if(code==1){
  mode = "green";
 }
 Rabort(messages[code],mode);
}

async function getUserIDkey(amount){
 rlog("getUserIDkey 0");
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
  Rwrite("4", "getUserIDkey 1");
  Rabort(messages[4],"red");
  return;
 }
 
 let data = await AJAX("../api/startHandshake.php",{"sender":sender,"i":i,"amount":amount});
 
 if(data['code']!=0){
  Rwrite(data['code'].toString(), "getUserIDkey 2");
  Rabort(messages[parseInt(data['code'])],"red");
  return;
 }
 let hID = data['id'];
 Rwrite("0\n"+data['i'].toString(), "getUserIDkey 3");
 
 RFS = function(){
  finishHandShake(hID);
 };
 RFreset = true;
}

function openOPIrecieve(){
 if(!INTERNET){
  alert("Need Internet to use this mode!");
  return;
 }
 
 openCard("opirecieve");
 
 let amount = parseFloat(prompt("Enter Amount to Recieve : "));
 if(isNaN(amount) || amount<=0){
  alert("Invalid Amount");
  closeOPIrecieve();
  return;
 }
 amount = parseInt(amount*100);
 amount = amount.toString();
 Rwrite(window.sessionStorage.username+"\n"+amount, "openOPIrecieve 1");
 
 RFS = function(){
  getUserIDkey(amount);
 };
 RFreset = true;
 
 Rread(function(){
  if(RFreset){
   if(RFS==undefined){
    ABORT_QR = true;
   }else{
    RFreset = false;
    RFS();
   }
  }
 });
}

function closeOPIrecieve(){
 openCard("menu");
 try {
 clearCanvas(Rcanvas)
 clearCanvas(RcanvasParent.querySelector("canvas"));
}catch(err) {
  console.log(err);
}
 ABORT_QR = true;
 Rsection.classList.remove("green");
 Rsection.classList.remove("red");
 Rsection.removeAttribute("msg");
 Rsteps = 0;
 RLOGS = "";
}