async function AJAX(url,data) {
  const rand = Math.floor((Math.random() * 10000000000) +1) ;
  const res = await fetch(url+'?'+rand.toString(), {
   method: "POST",
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify(data)
  });
  const content = await res.text();
  console.log(url,data,content);
  return JSON.parse(content);
}

/*
url = "http://127.0.0.1/api/account/try.php"

async function doit(){
 console.log(await AJAX(url,{"hello":"world","hakuna":"matata"}));
}

doit();

*/

/*
<?php
 header('Content-Type: application/json');

 $test=json_decode(file_get_contents("php://input"));

 echo json_encode($test);

?>
*/
