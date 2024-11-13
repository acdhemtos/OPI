<?php
 
 file_put_contents("./log", file_get_contents("php://input")."\n\n###\n\n", FILE_APPEND);
?>