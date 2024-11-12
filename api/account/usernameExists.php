<?php

function usernameExists($username) {
 require "../connection.php";
 $query = "SELECT * FROM users WHERE username = '".$username."'";
 return (mysqli_num_rows(mysqli_query($con, $query))>0?true:false);
}

?>