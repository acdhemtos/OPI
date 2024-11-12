<?php
 header('Content-Type: application/text');
 
 $data = json_decode(file_get_contents("php://input"),true);
 
 $username = $data['username'];
 
 require './usernamePolicy.php';
 $result = usernamePolicy($username);
 
 require './usernameExists.php';
 
 if($result['code']==1){
  $result['msg'] = "Invalid Username.";
 }else if(!usernameExists($username)){
  $result['code'] = 1;
  $result['msg'] = "User doesn't Exist.";
 }
 
 die(json_encode($result));
?>