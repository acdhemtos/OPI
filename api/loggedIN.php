<?php
 session_start();
 function loggedIN(){
  return isset($_SESSION["id"]);
 }
 
?>