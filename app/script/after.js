function setting(){
 INTERNET = true
 let repeated = function(){
  stillIN();
  updateBalance();
  //updateTransactions
  
 }
 INTERVAL = setInterval(repeated,2000);
}

window.addEventListener('online', setting);

setting();

window.addEventListener('offline', function(){
 clearInterval(INTERVAL);
 INTERNET = false
});

makeQR(document.querySelector("html>body>section.card#qr"),window.sessionStorage.username);