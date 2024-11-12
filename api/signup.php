<?php
 header('Content-Type: application/text');
 $data=json_decode(file_get_contents("php://input"),true);
 $username = $data['username'];
 $password = $data['password'];
 
 require './usernamePolicy.php';
 require './usernameExists.php';
 require './passwordPolicy.php';
 
 $result = usernamePolicy($username);
 
 $errorMSG = "Some Error Occured.";
 if($result['code']!=0 || usernameExists($username) || passwordPolicy($password)['code']!=0){
  $result['msg'] = $errorMSG;
  $result['code'] = 0;
 }else{
  require "./connection.php";
  $passHash = md5($password);
  $query = "INSERT INTO users (username, password) VALUES ('".$username."', '".$passHash."')";
  mysqli_query($con, $query);
  require "./generateCODE.php";
  resetCODE($con,$username);
  $result['msg'] = 'Signup Successful!';
 } 
 die(json_encode($result));
?>