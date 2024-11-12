<?php
 
 function fetchI($username){
  $con = mysqli_connect("127.0.0.1", "root", "", "opi");
  $sql = "SELECT i from users where username='".$username."'";
  $result = mysqli_query($con,$sql);
  $row = mysqli_fetch_assoc($result);
  return $row['i'];
 }
 
?>