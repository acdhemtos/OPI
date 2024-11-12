
function resizeCards(){
 const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
 const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
 
 let cards = document.querySelectorAll("[card]");
 for(let i=0;i<cards.length;i++){
  const cA = cards[i].getAttribute('card').split(" ");
  cards[i].style.height = (vh*parseInt(cA[0]))+"px";
  cards[i].style.width = (vw*parseInt(cA[1]))+"px";
 }
}

resizeCards();

window.onresize = resizeCards;