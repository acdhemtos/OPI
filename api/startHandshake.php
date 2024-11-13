<?php
 session_start();
 header('Content-Type: application/text');
 $data=json_decode(file_get_contents("php://input"),true);
 $sender = $data['sender'];
 $i = $data['i'];
 $amount = $data['amount'];
 
 require './usernamePolicy.php';
 require './usernameExists.php';
 
 
 $res = array();
 
 if(usernamePolicy($sender)['code']!=0 || !usernameExists($sender) || $sender==$_SESSION["username"]){
  $res['code'] = 3;
 }else{
  require './fetchI.php';
  $ni = fetchI($sender);
  $i = max($i,$ni);
  $res['i'] = $i;
  $i = $i+1;
  require "./fetchCODE.php";
  $hash = md5($_SESSION["username"].$amount.$i.fetchCODE($sender));
  require "./connection.php";
  $query = "UPDATE users SET i = ".$i." WHERE username = '".$sender."'";
  mysqli_query($con, $query);
  
  $query = "INSERT INTO handshakes (sender, reciever, hash,amount) VALUES ('".$sender."', '".$_SESSION["username"]."', '".$hash."', ".$amount.")";
  mysqli_query($con, $query);
  $res['id'] = mysqli_insert_id($con);
  $res['code'] = 0;
 } 
 die(json_encode($res));
?>