<?php
 
 function fetchBalance($username){
  require "./connection.php";
  $sql = "SELECT balance from users where username='".$username."'";
  $result = mysqli_query($con,$sql);
  $row = mysqli_fetch_assoc($result);
  return $row['balance'];
 }
 
?>