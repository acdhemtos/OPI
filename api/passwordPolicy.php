<?php

function passwordPolicy($password) {
 $result = array('code' => 1, 'msg' => '');

 if (strlen($password) < 8 || strlen($password) > 30) {
  $result['msg'] = 'Password must be between 8 and 30 characters long.';
  return $result;
 }
 
 if (!preg_match('/[a-z]/', $password)) {
  $result['msg'] = 'Password must contain at least one lowercase letter.';
  return $result;
 }
 
 if (!preg_match('/[A-Z]/', $password)) {
  $result['msg'] = 'Password must contain at least one uppercase letter.';
  return $result;
 }
 
 if (!preg_match('/\d/', $password)) {
  $result['msg'] = 'Password must contain at least one digit.';
  return $result;
 }

 if (!preg_match('/[\W_]/', $password)) {
  $result['msg'] = 'Password must contain at least one special character (e.g., !@#$%^&*).';
  return $result;
 }
 
 $result['code'] = 0;
 return $result;
}

?>