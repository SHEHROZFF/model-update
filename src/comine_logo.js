import * as THREE from 'three';
import { applylogo } from './apply_logo';
import { drawVerticalText } from './drawVerticalText';
// import { log } from 'three/examples/jsm/nodes/Nodes.js';


export const combineLogoChange = (sockTexture, logo, logoPlacement,text,textColor) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasWidth = sockTexture.image.width;
  const canvasHeight = sockTexture.image.height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
    
  console.log("clearing");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  console.log("cleared");
    
  // Draw default sock texture
  ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

  if(text) {
    ctx.globalCompositeOperation = 'source-atop'; // Use 'source-atop' to apply color overlay
    const updatedCtx = drawVerticalText(ctx, text, canvas, textColor);
    updatedCtx.globalCompositeOperation = 'source-over'; // Reset to default
  }

  // Apply logo if any
  if (logo) {
    // console.log(logoPlacement);
    console.log(logo);
    applylogo(ctx, canvasWidth, canvasHeight, logo, logoPlacement,sockTexture.image);

    console.log("change:",logoPlacement);
  }

  return new THREE.CanvasTexture(canvas);
};
