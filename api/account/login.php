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
  require "../connection.php";
  $passHash = md5($password);
  
  $query = "SELECT id FROM users WHERE username='".$username."' AND password='".$passHash."'";
  $res = mysqli_query($con, $query);
  if(mysqli_num_rows($res)==0){
   $result['msg'] = 'Wrong Password';
   $result['code'] = 1;
  }else{
   session_start();
   $_SESSION["id"] = (int)(mysqli_fetch_row($res)[0]);
   $result['msg'] = "Login Successful!";
  }
 } 
 die(json_encode($result));
?>