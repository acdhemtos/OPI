<?php

function usernamePolicy($username) {
 $result = array('code' => 1, 'msg' => '');

 if (strlen($username) < 8 || strlen($username) > 15) {
  $result['msg'] = 'Username must be between 8 and 15 characters long.';
  return $result;
 }

 if (!preg_match('/^[a-z]+$/', $username)) {
  $result['msg'] = 'Username must only contain lowercase alphabets (a-z).';
  return $result;
 }

 $result['code'] = 0;
 return $result;
}


?>