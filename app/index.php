<?php
session_start();

if(isset($_SESSION["id"])){
 echo "LOGGED IN";
}else{
 echo "NOT LOGGED IN";
}

?>