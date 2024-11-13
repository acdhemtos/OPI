<?php
 require "../api/loggedIN.php";
 if(!loggedIN()){
  die('<script type="text/javascript">window.location.href = "../account/login.html";</script>');
 }
 require "../api/fetchCODE.php";
 require "../api/fetchI.php";
?>

<html>
 <head>
  <link rel="stylesheet" href="./style.css" />
 </head>
 <body>
  <section id="menu" class="card">
   <div>
    <span></span>
    <!--<button>Transactions</button>-->
    <button onclick="openCard('qr');">QR</button>
    <button onclick="openSendMoney();">Send Money</button>
    <button onclick="openOPIrecieve();">OPI Recieve</button>
    <button onclick="openOPIsend();">OPI Send</button>
    <a href="../api/logout.php">Logout</a>
   </div>
  </section>
  <!--<section id="transactions" class="card"></section>-->
  <section id="qr" class="card">
   <button onclick="openCard('menu');">BACK</button>
   <canvas></canvas>
   </div>
  </section>
  <section id="sendmoney" class="card">
    <canvas></canvas>
    <div>
     <label>Reciever :&nbsp;<input type="text" disabled></label>
     <label>Amount :&nbsp;<input type="number"></label>
     <label>Password :&nbsp;<input type="password"></label>
     <button onclick="sendMoney();">SEND</button>
    </div>
    <button onclick="closeSendMoney();">BACK</button>
  </section>
  <section id="opisend" class="card">
   <div id="canvas"><canvas></canvas></div>
   <canvas id="webcam"></canvas>
   <a onclick="closeOPIsend();">Ba ck</a>
  </section>
  <section id="opirecieve" class="card">
   <div id="canvas"><canvas></canvas></div>
   <canvas id="webcam"></canvas>
   <a onclick="closeOPIrecieve();">Back</a>
  </section>
  <script type="text/javascript">
   window.sessionStorage.username = '<?php echo $_SESSION["username"]; ?>';
   window.sessionStorage.code = '<?php echo fetchCODE($_SESSION["username"]); ?>';
   window.sessionStorage.i = '<?php echo fetchI($_SESSION["username"]); ?>';
   
  </script>
  <script type="text/javascript" src="../ajax.js"></script>
  <script type="text/javascript" src="./script/qrCanvas.js"></script>
  <script type="text/javascript" src="./script/qrScan.js"></script>
  <script type="text/javascript" src="./script/before.js"></script>
  <script type="text/javascript" src="./script/makeQR.js"></script>
  <script type="text/javascript" src="./script/sendMoney.js"></script>
  <script type="text/javascript" src="./script/MD5.js"></script>
  <script type="text/javascript" src="./script/opiSend.js"></script>
  <script type="text/javascript" src="./script/opiRecieve.js"></script>
  <script type="text/javascript" src="./script/after.js"></script>
 </body>
</html>