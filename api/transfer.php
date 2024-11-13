<?php
 function transfer($sender,$reciever,$amount){
  require "./connection.php";
  $query = "INSERT INTO transactions (sender, receiver, amount) VALUES ('".$sender."', '".$reciever."', ".$amount.")";
  
  mysqli_query($con, $query);
  
  $query = "UPDATE users SET balance = balance - ".$amount." WHERE username = '".$sender."'";
  mysqli_query($con, $query);
  $query = "UPDATE users SET balance = balance + ".$amount." WHERE username = '".$reciever."'";
  mysqli_query($con, $query);
 }
?>