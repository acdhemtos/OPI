<?php
 
 header('Content-Type: application/text');
?>{"login":<?php
 
 require "./loggedIN.php";
 
 echo (loggedIN())?"1":"0";

?>}