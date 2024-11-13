window.addEventListener("error", handleError, true);

function handleError(evt) {
    if (evt.message) { // Chrome sometimes provides this
      alert("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
    } else {
      alert("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
    }
}

Ssection = document.querySelector("html>body>section.card#opisend");
ScanvasParent = document.querySelector("html>body>section.card#opisend>div#canvas");
Scanvas = ""

try {
 Scanvas = document.querySelector('html>body>section.card#opisend>canvas#webcam');
}catch(err) {
  console.log(err);
}

ScanvasParent.onclick = function(){ alert(SLOGS); };

function Swrite(msg,name){
 SLOGS += "WRITING : "+name+" : "+msg+"\n";
 makeQR(ScanvasParent,msg);
}

MSG = ""

function Sread(func){
 startReading("front",Scanvas,func);
}

Ssteps = 0
SLOGS = ""

function Sabort(msg,cla){
 Ssection.setAttribute("msg",msg);
 Ssection.classList.add(cla);
}

function slog(msg){
 SLOGS +="READING : "+msg+" : "+QR+"\n";
}

function funcName(){
 alert("3.0");
 if(Ssteps==2){
  Ssteps = 3;
  alert("3.1");
  slog("funcName");
  let mode = "red";
  if(QR=="1"){
   mode = "green";
  }
  Sabort(messages[parseInt(QR)],mode);
  alert("3.3");
 }
}

function verifyKey(reciever,amount){
 slog("verifyKey 0");
 if(QR=="3" || QR=="4"){
  Sabort(messages[parseInt(QR)],"red");
  return;
 }
 let msg = QR.split("\n");
 if(msg.length!=2 || msg[0]!="0"){
  Swrite("4","verifyKey 1");
  Sabort(messages[4],"red");
  return;
 }
 let i = parseInt(msg[1]);
 if(i==NaN || i<0){
  Swrite("4","verifyKey 2");
  
  
  Sabort(messages[4],"red");
  return;
 }
 if(i<window.sessionStorage.i){
  Swrite("3","verifyKey 3");
  Sabort(messages[3],"red");
  return;
 }
 window.sessionStorage.i = i+1;
 let s = reciever+amount+i.toString()+window.sessionStorage.code;
 console.log(s);
 let hash = MD5(s);
 Swrite(hash,"verifyKey 4");
 MSG = "dasda";
 Sread(funcName);
}

function verifyUsernameAmount(amount){
 slog("verifyUsernameAmount 0");
 let msg = QR.split("\n");
 if(msg.length!=2){
  Swrite("4", "verifyUsernameAmount 1");
  Sabort(messages[4],"red");
  return;
 }
 let reciever = msg[0];
 if(msg[1]!=amount){
  Swrite("4", "verifyUsernameAmount 2 "+amount,);
  Sabort(messages[4],"red");
  return;
 }
 
 Swrite(window.sessionStorage.username+"\n"+window.sessionStorage.i, "verifyUsernameAmount 3");
 Sread(function(){
  if(Ssteps==1){
   Ssteps = 2;
   verifyKey(reciever,amount);
  }
 });
}

function openOPIsend(){

 openCard("opisend");
 let amount = parseFloat(prompt("Enter Amount to Send : "));
 if(isNaN(amount) || amount<=0){
  alert("Invalid Amount");
  closeOPIsend();
  return;
 }
 Ssteps = 0;
 amount = parseInt(amount*100);
 amount = amount.toString();
 Sread(function(){
  if(Ssteps==0){
   Ssteps = 1;
   verifyUsernameAmount(amount); 
  }
 });
}

function closeOPIsend(){
 openCard("menu");
 try {
 clearCanvas(Scanvas)
 clearCanvas(ScanvasParent.querySelector("canvas"));
}catch(err) {
  console.log(err);
}
 
 Ssection.classList.remove("green");
 Ssection.classList.remove("red");
 Ssection.removeAttribute("msg");
 Ssteps = 0;
 SLOGS = "";
}
