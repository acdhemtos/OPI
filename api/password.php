<?php
 header('Content-Type: application/text');
 $data=json_decode(file_get_contents("php://input"),true);
 $password = $data['password'];
 
 require './passwordPolicy.php';
 die(json_encode(passwordPolicy($password)));
?>