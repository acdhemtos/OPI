<?php
 
 function fetchCODE($username){
  $con = mysqli_connect("127.0.0.1", "root", "", "opi");
  $sql = "SELECT code from users where username='".$username."'";
  $result = mysqli_query($con,$sql);
  $row = mysqli_fetch_assoc($result);
  return $row['code'];
 }
 
?>