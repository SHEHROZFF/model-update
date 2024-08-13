import { applyPattern } from "./pattern";
import * as THREE from 'three';
import { applylogo } from "./apply_logo";

export const combinePattern = (sockTexture, logo, pattern,logoPlacement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasWidth = sockTexture.image.width;
  const canvasHeight = sockTexture.image.height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw base sock texture
  ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

  // Apply pattern if any
  if (pattern) {
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    patternCanvas.width = canvasWidth;
    patternCanvas.height = canvasHeight;
    patternCtx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

    applyPattern(patternCtx, canvasWidth, canvasHeight, pattern,logoPlacement);

    const patternImg = patternCtx.createPattern(patternCanvas, 'no-repeat');
    ctx.globalCompositeOperation = 'multiply'; // Ensure pattern is applied correctly
    ctx.fillStyle = patternImg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly

  }

  // Apply logo if any
  if (logo) {
    applylogo(ctx,canvasWidth,canvasHeight,logo,logoPlacement,sockTexture.image)

  }
  return new THREE.CanvasTexture(canvas);
};

