<?php
 
 header('Content-Type: application/text');
?>{"code":"<?php
 session_start();
 if(!isset($_SESSION["username"])){
  die("notset");
 }
 require "./fetchCODE.php";
 echo fetchCODE($_SESSION["username"]);

?>"}