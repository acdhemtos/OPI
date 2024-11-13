<?php
 session_start();
 header('Content-Type: application/text');
 $data=json_decode(file_get_contents("php://input"),true);
 $id = $data['id'];
 $hash = $data['hash'];
 
 $res = array();
 
 require "./connection.php";
 $query = "SELECT * FROM handshakes WHERE id = ".$id;

 $result = mysqli_query($con, $query);

 require "./fetchBalance.php";
 if (mysqli_num_rows($result) == 0) {
  $res['code'] = 3;
 } else {
  $row = mysqli_fetch_assoc($result);
  $sender = $row["sender"];
  $amount = $row["amount"];
  if($row["reciever"]!=$_SESSION['username']){
   $res['code'] = 3;
  }else if(fetchBalance($sender)<$amount){
   $res['code'] = 2;
  }else{
   require "./transfer.php";
   transfer($sender,$row["reciever"],$amount);
   $query = "DELETE FROM handshakes WHERE id = ".$id;
   $result = mysqli_query($con, $query);
   $res['code'] = 1;
  }
 }
 die(json_encode($res));
  
?>