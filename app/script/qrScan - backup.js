//Edited from https://jsfiddle.net/4dq0sfay/

QR = ""
ABORT_QR = false

function verify(str) {
 if (str.length >=6 && str.startsWith('$$$') && str.endsWith('$$$')) {
  return str.slice(3, str.length - 3);
 }
 return false;
}

function startReading(mode,canvas,func){
 ABORT_QR = false;
 navigator.mediaDevices.enumerateDevices().then((devices) => {
  let id = 0;
  for(let i=0;i<devices.length && id!=0;i++){
   if(devices[i].kind=="videoinput" && devices[i].label.endsWith(mode)){
    id = devices[i].deviceId;
   }
  }
  console.log(id);
  let constrains = {video: {optional: [{sourceId: id }]}};
  
  navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
   let capturer = new ImageCapture(stream.getVideoTracks()[0]);
   step(capturer);
  });
 });

 function step(capturer) {
  let ctx = canvas.getContext("2d");
  if(!ABORT_QR){   
   capturer.grabFrame().then((bitmap) => {
    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, canvas.width, canvas.height);
    var barcodeDetector = new BarcodeDetector();
    barcodeDetector.detect(bitmap).then(barcodes => {
     let barcode = verify(barcodes.map(barcode => barcode.rawValue).join(', '));
     
     if(barcode!=false && barcode!="" && barcode!=QR){
      QR = barcode;
      ABORT_QR = true;
      func();
     }
     step(capturer);
    }).catch((e) => {
     console.error(e);
    });
   });
  }else{
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
 }
}