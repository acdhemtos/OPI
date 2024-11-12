divs = document.querySelectorAll("html>body>section>div>form>div:not(:last-child)");
for(let i=0;i<divs.length;i++){
 divs[i].removeAttribute("error");
 divs[i].querySelector('input').value = "";
}