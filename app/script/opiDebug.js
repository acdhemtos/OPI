
function Rwrite(msg,name){
 document.querySelector("html>body>section.card#opirecieve>div#canvas>textarea").value = msg;
}
function Rread(func){ document.querySelector('html>body>section.card#opirecieve>textarea#webcam').oninput = function(){
  QR = document.querySelector('html>body>section.card#opirecieve>textarea#webcam').value;
  func();
 }
}

function Swrite(msg,name){
 document.querySelector("html>body>section.card#opisend>div#canvas>textarea").value = msg;
}

function Sread(func){
 document.querySelector('html>body>section.card#opisend>textarea#webcam').oninput = function(){
  QR = document.querySelector('html>body>section.card#opisend>textarea#webcam').value;
  func();
 }
}

ScanvasParent.onclick = function(){
 
}

RcanvasParent.onclick = function(){
 
}