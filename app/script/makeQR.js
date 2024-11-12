function makeQR(div,str){
 const canvas = qrcanvas.qrcanvas({
  data: "$$$"+str+"$$$"
 });
 let prevCanvas = div.querySelectorAll('canvas');
 for(let i=0;i<prevCanvas.length;++i){
  prevCanvas[i].remove();
 }
 div.appendChild(canvas);
}