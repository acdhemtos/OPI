<?php
 header('Content-Type: application/text');
 $data=json_decode(file_get_contents("php://input"),true);
 $username = $data['username'];
 $password = $data['password'];
 
 require './usernamePolicy.php';
 require './usernameExists.php';
 require './passwordPolicy.php';
 
 $result = usernamePolicy($username);
 
 if($result['code']!=0 || !usernameExists($username) || passwordPolicy($password)['code']!=0){
  $result['msg'] = "Some Error Occured.";
  $result['code'] = 1;
 }else{
  require "./connection.php";
  $passHash = md5($password);
  
  $query = "SELECT * FROM users WHERE username='".$username."' AND password='".$passHash."'";
  if(mysqli_num_rows(mysqli_query($con, $query))==0){
   $result['msg'] = 'Wrong Password';
   $result['code'] = 1;
  }else{
   session_start();
   $_SESSION["username"] = $username;
   require "./generateCODE.php";
   resetCODE($con,$username);
   $result['msg'] = "Login Successful!";
  }
 } 
 die(json_encode($result));
?>