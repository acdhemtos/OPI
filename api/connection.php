<?php

$con = mysqli_connect("127.0.0.1", "root", "", "opi");

if (!$con) { die(json_encode(array('code' => 1, 'msg' => 'Database Connection Unsuccessful!'))); }

?>
