<?php
 session_start();
 if(!isset($_SESSION["username"])){
  die("notset");
 }
 header('Content-Type: application/text');
 $data=json_decode(file_get_contents("php://input"),true);
 $reciever = $data['reciever'];
 $password = $data['password'];
 $amount = $data['amount'];
 
 require './usernamePolicy.php';
 require './usernameExists.php';
 require './passwordPolicy.php';
 
 $result = usernamePolicy($reciever);
 if($result['code']==0 && usernameExists($reciever)){
  if($reciever!=$_SESSION["username"]){
   if(passwordPolicy($password)['code']!=0){
    $result['msg'] = "Invalid Password";
    $result['code'] = 1;
   }else{
    require "./connection.php";
    $passHash = md5($password);
    
    $query = "SELECT * FROM users WHERE username='".$_SESSION["username"]."' AND password='".$passHash."'";
    if(mysqli_num_rows(mysqli_query($con, $query))==0){
     $result['msg'] = 'Wrong Password.';
     $result['code'] = 1;
    }else{
     require "./fetchBalance.php";
     if(fetchBalance($_SESSION["username"])<$amount){
      $result['msg'] = 'Insufficient Balance.';
      $result['code'] = 1;
     }else if($amount==0){
      $result['msg'] = 'Cannot Transfer 0.';
      $result['code'] = 1;
     }else{
      require "./connection.php";
      $query = "INSERT INTO transactions (sender, receiver, amount) VALUES ('".$_SESSION["username"]."', '".$reciever."', ".$amount.")";
      mysqli_query($con, $query);
      $query = "UPDATE users SET balance = balance - ".$amount." WHERE username = '".$_SESSION["username"]."'";
      mysqli_query($con, $query);
      $query = "UPDATE users SET balance = balance + ".$amount." WHERE username = '".$reciever."'";
      mysqli_query($con, $query);
      $result['msg'] = "Transaction Successful!";
     }
    }
   }
  }else{
   $result['msg'] = "Cannot Send money to self.";
   $result['code'] = 1;
  }
 }else{
  $result['msg'] = "Reciever doesn't Exist.";
 } 
 die(json_encode($result));
?>