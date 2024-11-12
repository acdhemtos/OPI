<?php
 
 header('Content-Type: application/text');
?>{"balance":<?php
 session_start();
 if(!isset($_SESSION["username"])){
  die("notset");
 }
 require "./fetchBalance.php";
 echo fetchBalance($_SESSION["username"]);

?>}