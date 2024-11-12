<?php
 
 function generateCODE(){
  $characters = array_merge(range('A', 'Z'), range('a', 'z'), range('0', '9'));
  $n = count($characters);
  $str = "";
  for ($i = 0; $i < 30; $i++) {
   $str = $str.$characters[rand(1,$n)-1];
  }
  return $str;
 }
 
 function resetCODE($con,$username){
  $query = "UPDATE users SET code = '".generateCODE()."' WHERE username='".$username."'";
  mysqli_query($con, $query);
 }
?>
