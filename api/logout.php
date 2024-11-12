<?php
 require './loggedIN.php';
 if(isset($_SESSION["id"])){
  unset($_SESSION["id"]);
 }
 
?>

<script type="text/javascript">
window.location.href = "../account/login.html";
</script>