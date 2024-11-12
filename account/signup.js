async function signup(){
 let divs = document.querySelectorAll('html>body>section>form>div');
 let username = divs[0];
 let pass = divs[1];
 let repass = divs[2];
 
 let userVal = username.querySelector('input').value;
 let passVal = pass.querySelector('input').value;
 let rePassVal = repass.querySelector('input').value;
 
 let usernameValidate = await AJAX("../api/account/signupUsername.php",{"username":userVal});
 if(usernameValidate['code']==0){
  username.removeAttribute('error');
 }else{
  username.setAttribute('error',usernameValidate['msg']);
  return;
 }
 
 let passwordValidate = await AJAX("../api/account/password.php",{"password":passVal});
 if(passwordValidate['code']==0){
  pass.removeAttribute('error');
 }else{
  pass.setAttribute('error',passwordValidate['msg']);
  return;
 }
 
 if(passVal==rePassVal){
  repass.removeAttribute('error');
 }else{
  repass.setAttribute('error',"Passwords don't match.");
  return;
 }
 
 let signupValidate = await AJAX("../api/account/signup.php",{"username":userVal,"password":passVal});
 alert(signupValidate['msg']);
 if(signupValidate['code']==0){
  window.location.href = "./login.html";
 }
 
 
}