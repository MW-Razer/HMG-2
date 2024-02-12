// sets up and scales canvas to make sense somehow

const canvas0 = document.getElementById('c0');
const ctx0 = canvas0.getContext('2d');

let w, h, ratio;

const scaleFunc = function() {
  
  w = window.innerWidth;
  h = window.innerHeight;
  
  // correct for device res differences
  let PIXEL_RATIO = (function() {
    let dpr = window.devicePixelRatio || 1,
        bsr = canvas0.webkitBackingStorePixelRatio ||
          canvas0.mozBackingStorePixelRatio ||
          canvas0.msBackingStorePixelRatio ||
          canvas0.oBackingStorePixelRatio ||
          canvas0.backingStorePixelRatio || 1;
    
    return dpr / bsr;
  })();
    
  ratio = PIXEL_RATIO;
  
  //console.log(PIXEL_RATIO);
  
  canvas0.width = w * ratio;
  canvas0.height = h * ratio;
  canvas0.style.width = w + "px";
  canvas0.style.height = h + "px";
  ctx0.setTransform(ratio, 0, 0, ratio, 0, 0);
    
}

addEventListener('load', scaleFunc);
addEventListener('resize', scaleFunc);

scaleFunc();