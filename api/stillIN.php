<?php
 
 header('Content-Type: application/text');
?>{"login":<?php
 $data=json_decode(file_get_contents("php://input"),true);
 $code = $data['code'];
 require "./loggedIN.php";
 require "./fetchCODE.php";
 
 if(loggedIN() && fetchCODE($_SESSION["username"])==$code){
  echo "1";
 }else{
  echo "0";
 }

?>}