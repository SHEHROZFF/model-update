// export function createTextTexture(text, fontSize, color) {
//     // Create a canvas to draw the text
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
  
//     // Set the canvas size
//     canvas.width = 512; // You can adjust the size
//     canvas.height = 512; // You can adjust the size
  
//     // Set text properties
//     ctx.font = `${fontSize}px Arial`;
//     ctx.fillStyle = color;
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
  
//     // Draw the text
//     ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
//     // Create a texture from the canvas
//     const texture = new THREE.CanvasTexture(canvas);
//     texture.needsUpdate = true;
  
//     return texture;
//   }
  