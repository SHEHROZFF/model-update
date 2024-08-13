export const applyPattern = (ctx, canvasWidth, canvasHeight, pattern,logo) => {
  const patternCanvas = document.createElement('canvas');
  const patternCtx = patternCanvas.getContext('2d');
  console.log(canvasHeight,canvasWidth);
  patternCanvas.width = canvasWidth; // Pattern width
  patternCanvas.height = canvasHeight; // Pattern height
  patternCtx.globalCompositeOperation = "multiply"
  let patternImg;

  switch (pattern) {
    // -------------------------------------------------dots------------------------------------------------
    case 'dots':
      const dotColors = ['#85BFCB', '#01284D', '#D9D9D9']; // Red, Green, Blue dots
      const dotRadius = 20; // Increase dot size
      const spacing = 50; // Increase spacing between dots
      patternCanvas.width = 100;
      patternCanvas.height = 100;
      patternCtx.fillStyle = '#006868'; // Red color
      patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height); // Top stripe
      // patternCtx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
      

      for (let y = dotRadius; y < 200; y += spacing) {
        for (let x = dotRadius; x < 200; x += spacing) {
          const colorIndex = (x + y) % 3; // Alternate colors based on position
          patternCtx.fillStyle = dotColors[colorIndex];
          patternCtx.beginPath();
          patternCtx.arc(x, y, dotRadius, 0, Math.PI * 2); // Dots
          patternCtx.fill();
        }
      }

      // if (y > 150 && y < 200) {
        // if (logo === 'footbed') {
        //   patternCtx.fillStyle = '#006868'; // Blue color
        //   patternCtx.fillRect(0,0, 300, 530); // Bottom stripe
        //   patternCtx.fillRect(900,0, 500, 530); // Bottom stripe
  
        // }
      // }

      patternImg = ctx.createPattern(patternCanvas, 'repeat');
      ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
      ctx.fillStyle = patternImg;
    break;
    // -------------------------------------------------chevrons-----------------------------------------------------
    // case 'chevrons':
    //   const colors = ['#810808', '#00FF00']; // Colors for the custom wave pattern
    //   patternCanvas.width = 100;
    //   patternCanvas.height = 100;
    //   patternCtx.lineWidth = 1;

    //   for (let i = 0; i < 10; i++) {
    //     patternCtx.fillStyle = colors[i % 2];
    //     patternCtx.beginPath();
    //     patternCtx.moveTo(0, i * 10);
    //     for (let j = 0; j <= 10; j++) {
    //       patternCtx.quadraticCurveTo(
    //         j * 10 - 5, i * 10 + (j % 2 === 0 ? 10 : 0),
    //         j * 10, i * 10
    //       );
    //     }
    //     patternCtx.lineTo(100, (i + 1) * 10);
    //     patternCtx.lineTo(0, (i + 1) * 10);
    //     patternCtx.closePath();
    //     patternCtx.fill();
    //   }
    //   patternImg = ctx.createPattern(patternCanvas, 'repeat');
    //   ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
    //   ctx.fillStyle = patternImg;
    // break;
    // // -----------------------------------------------------waves---------------------------------------------------
    // case 'waves':
    //   const zigzagColor = '#FF0000'; // Color for the zigzag lines
    //   const zigzagHeight = 20; // Height of each zigzag segment
    //   const zigzagWidth = 100; // Width of each zigzag segment
    //   const lineWidth = 10; // Width of the zigzag lines
    
    //   patternCtx.strokeStyle = zigzagColor;
    //   patternCtx.lineWidth = lineWidth;
    

    //     patternCtx.beginPath();
    //     for (let x = 0; x <= patternCanvas.width; x += zigzagWidth) {
    //       patternCtx.lineTo(x, (x % (2 * zigzagWidth) < zigzagWidth ? 0 : zigzagHeight));
    //     }
    //     patternCtx.stroke();

    
    //   // Create pattern and apply it
    //   patternImg = ctx.createPattern(patternCanvas, 'repeat');
    //   ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
    //   ctx.fillStyle = patternImg;
    //   ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // break;
    // -----------------------------------------------checkerboard----------------------------------------------------
    case 'checkerboard':
      // Define your colors array
      patternCanvas.width = 100;
      patternCanvas.height = 100;
      const ccolors = ['#282A2C', '#E56E46', '#CFCFCF']; // Example colors: Red, Green, Blue
      const tileSize = 50; // Size of each tile
      const patternWidth = 100; // Width of the pattern
      const patternHeight = 100; // Height of the pattern
    
      // Loop through the pattern area
      for (let y = 0; y < patternHeight; y += tileSize) {
        for (let x = 0; x < patternWidth; x += tileSize) {
          // Determine the color to use based on the position
          const colorIndex = ((x / tileSize) + (y / tileSize)) % ccolors.length;
          patternCtx.fillStyle = ccolors[colorIndex];
          patternCtx.fillRect(x, y, tileSize, tileSize);
        }
      }
      // if (logo === 'footbed') {
      //   patternCtx.fillStyle = '#E56E46'; // Blue color
      //   patternCtx.fillRect(0,0, 300, 530); // Bottom stripe
      //   patternCtx.fillRect(900,0, 500, 530); // Bottom stripe

      // }
    patternImg = ctx.createPattern(patternCanvas, 'repeat');
    ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
    ctx.fillStyle = patternImg;
    break;
    // case 'customWave': // New custom pattern based on the uploaded image
    // --------------------------------------------------illutionistic-----------------------------------------------------
    case 'illusionistic': // New custom pattern based on the uploaded image
      const red = '#000';
      const white = '#ff0000';
      const black = '#810808';
      patternCanvas.width = 100;
      patternCanvas.height = 100;
      const drawWaveSegment = (ctx, startX, startY, color, width, height) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(startX + width / 4, startY - height, startX + width / 2, startY);
        ctx.quadraticCurveTo(startX + 3 * width / 4, startY + height, startX + width, startY);
        ctx.lineTo(startX + width, startY + height);
        ctx.lineTo(startX, startY + height);
        ctx.closePath();
        ctx.fill();
      };

      const waveHeight = 50;
      const waveWidth = 100;

      for (let y = 0; y < patternCanvas.height; y += waveHeight) {
        if (y % 40 === 0) {
          drawWaveSegment(patternCtx, 0, y, red, waveWidth, waveHeight);
        } else {
          drawWaveSegment(patternCtx, 0, y, white, waveWidth, waveHeight);
        }
        
        patternCtx.strokeStyle = black;
        patternCtx.lineWidth = 1;
        for (let x = 0; x < patternCanvas.width; x += 2) {
          patternCtx.beginPath();
          patternCtx.moveTo(x, y);
          patternCtx.lineTo(x, y + waveHeight);
          patternCtx.stroke();
        }
      }
      // if (logo === 'footbed') {
      //   patternCtx.fillStyle = black; // Blue color
      //   patternCtx.fillRect(0,0, 300, 530); // Bottom stripe
      //   patternCtx.fillRect(900,0, 500, 530); // Bottom stripe

      // }
    patternImg = ctx.createPattern(patternCanvas, 'repeat');
    ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
    ctx.fillStyle = patternImg;
    break;
    // ------------------------------------------------stripes------------------------------------------------
    case 'stripes': // New custom pattern based on the uploaded image
      // const r = '#ff0000';
      // const w = '#ffff';
      // const b = '#000000';
      // const waveHeights = 30;
      // const waveWidths = 100;
      // const lineHeight = 5;

      // for (let y = 0; y < patternCanvas.height; y += 2 * waveHeights) {
      //   // Draw red wave
      //   patternCtx.fillStyle = r;
      //   patternCtx.beginPath();
      //   for (let x = 0; x <= waveWidths; x++) {
      //     patternCtx.lineTo(x, y + (x % 20 === 0 ? waveHeights : 0));
      //   }
      //   patternCtx.lineTo(waveWidths, y + waveHeights);
      //   patternCtx.lineTo(0, y + waveHeights);
      //   patternCtx.closePath();
      //   patternCtx.fill();

      //   // Draw white wave
      //   patternCtx.fillStyle = w;
      //   patternCtx.beginPath();
      //   for (let x = 0; x <= waveWidths; x++) {
      //     patternCtx.lineTo(x, y + waveHeights + (x % 20 === 0 ? waveHeights : 0));
      //   }
      //   patternCtx.lineTo(waveWidths, y + 2 * waveHeights);
      //   patternCtx.lineTo(0, y + 2 * waveHeights);
      //   patternCtx.closePath();
      //   patternCtx.fill();
      // }

      // // Draw horizontal black lines
      // patternCtx.strokeStyle = b;
      // patternCtx.lineWidth = 1;
      // for (let y = 0; y <= patternCanvas.height; y += waveHeights) {
      //   patternCtx.beginPath();
      //   patternCtx.moveTo(0, y);
      //   patternCtx.lineTo(patternCanvas.width, y);
      //   patternCtx.stroke();
      // }
      // patternImg = ctx.createPattern(patternCanvas, 'repeat');
      // ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
      // ctx.fillStyle = patternImg;
      // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
      const colss_1 = '#035CB5';
      const colss_2 = '#83C0CC';
      const colss_3 = '#E1C85F';
      const colss_4 = '#CA0F34';

      // for (let index = 100; index < 301; index+=100) {
        patternCtx.fillStyle = colss_1; // Red color
        patternCtx.fillRect(-1100, 0, patternCanvas.width, 15); // Top stripe
        patternCtx.fillRect(1100, 0, patternCanvas.width, 15); // Top stripe

        
        // }

      // // Draw blue stripe at the bottom
      // patternCtx.fillStyle = colss_2; // Blue color
      // patternCtx.fillRect(5,50, patternCanvas.width, 15); // Bottom stripe

      // patternCtx.fillStyle = colss_3; // Red color
      // patternCtx.fillRect(10, 100, patternCanvas.width, 15); // Top stripe
      
      // patternCtx.fillStyle = colss_4; // Red color
      // patternCtx.fillRect(30, 150, patternCanvas.width, 15); // Top stripe

      patternImg = ctx.createPattern(patternCanvas, 'repeat-x');
      ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
      ctx.fillStyle = patternImg;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    break;
    // ------------------------------------------------nopattern----------------------------------------------------------
    case 'custom_1':
      patternCtx.fillStyle = '#ffffff'; // Red color
      patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height); // Top stripe
      patternCtx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
      
      
      // Draw red stripe at the top
      patternCtx.fillStyle = '#FF0000'; // Red color
      patternCtx.fillRect(0, 930, patternCanvas.width, 25); // Top stripe

      // Draw blue stripe at the bottom
      patternCtx.fillStyle = '#0000FF'; // Blue color
      patternCtx.fillRect(0,970, patternCanvas.width, 25); // Bottom stripe

      patternCtx.fillStyle = '#FF0000'; // Red color
      patternCtx.fillRect(0, 800, patternCanvas.width, 25); // Top stripe

      // Draw blue stripe at the bottom
      patternCtx.fillStyle = '#0000FF'; // Blue color
      patternCtx.fillRect(0,840, patternCanvas.width, 25); // Bottom stripe

      patternImg = ctx.createPattern(patternCanvas, 'repeat-x');
      ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
      ctx.fillStyle = patternImg;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      break;
    case 'custom_2':
        patternCtx.fillStyle = '#023865'; // Red color
        patternCtx.fillRect(0, 0, patternCanvas.width, 800); // Top stripe
        patternCtx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly

        patternCtx.fillStyle = '#ffffff'; // Red color
        patternCtx.fillRect(0, 800, patternCanvas.width, 400); // Top stripe
        patternCtx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
        
        
        // Draw red stripe at the top
        patternCtx.fillStyle = '#E4CB63'; // Red color
        patternCtx.fillRect(0, 810, patternCanvas.width, 30); // Top stripe
  
        // Draw blue stripe at the bottom
        patternCtx.fillStyle = '#EBB14A'; // Blue color
        patternCtx.fillRect(0,850, patternCanvas.width, 30); // Bottom stripe
  
        patternCtx.fillStyle = '#F1653F'; // Red color
        patternCtx.fillRect(0, 890, patternCanvas.width, 30); // Top stripe
  
        patternImg = ctx.createPattern(patternCanvas, 'repeat-x');
        ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
        ctx.fillStyle = patternImg;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        break;
        case 'custom_3':
          patternCtx.fillStyle = '#ffffff'; // Red color
          patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height); // Top stripe
          patternCtx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly

          const col_1 = '#035CB5';
          const col_2 = '#83C0CC';
          const col_3 = '#E1C85F';
          const col_4 = '#CA0F34';
          // Draw red stripe at the top
          patternCtx.fillStyle = col_1; // Red color
          patternCtx.fillRect(0, 1070, patternCanvas.width, 20); // Top stripe
    
          // Draw blue stripe at the bottom
          patternCtx.fillStyle = col_2; // Blue color
          patternCtx.fillRect(0,1100, patternCanvas.width, 20); // Bottom stripe
    
          patternCtx.fillStyle = col_3; // Red color
          patternCtx.fillRect(0, 1130, patternCanvas.width, 20); // Top stripe
          
          patternCtx.fillStyle = col_4; // Red color
          patternCtx.fillRect(0, 1160, patternCanvas.width, 20); // Top stripe


          patternCtx.fillStyle = col_1; // Red color
          patternCtx.fillRect(0, 0, patternCanvas.width, 10); // Top stripe
    
          // Draw blue stripe at the bottom
          patternCtx.fillStyle = col_2; // Blue color
          patternCtx.fillRect(0,20, patternCanvas.width, 10); // Bottom stripe
    
          patternCtx.fillStyle = col_3; // Red color
          patternCtx.fillRect(0, 40, patternCanvas.width, 10); // Top stripe
          
          patternCtx.fillStyle = col_4; // Red color
          patternCtx.fillRect(0, 60, patternCanvas.width, 10); // Top stripe
    
          patternImg = ctx.createPattern(patternCanvas, 'repeat-x');
          ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
          ctx.fillStyle = patternImg;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          break;
          case 'custom_4':
            patternCtx.fillStyle = '#1F1E7A'; // Red color
            patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height); // Top stripe
            patternCtx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
  
            const cols_1 = '#035CB5';
            const cols_2 = '#83C0CC';
            const cols_3 = '#E1C85F';
            const cols_4 = '#CA0F34';
  
            patternCtx.fillStyle = cols_1; // Red color
            patternCtx.fillRect(0, 60, patternCanvas.width, 10); // Top stripe
      
            // Draw blue stripe at the bottom
            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,80, patternCanvas.width, 10); // Bottom stripe
      
            patternCtx.fillStyle = cols_3; // Red color
            patternCtx.fillRect(0, 100, patternCanvas.width, 10); // Top stripe
            
            patternCtx.fillStyle = cols_4; // Red color
            patternCtx.fillRect(0, 120, patternCanvas.width, 10); // Top stripe



            // Draw blue stripe at the bottom
            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,200, patternCanvas.width, 30); // Bottom stripe



            patternCtx.fillStyle = cols_1; // Red color
            patternCtx.fillRect(0, 320, patternCanvas.width, 10); // Top stripe
      
            // Draw blue stripe at the bottom
            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,340, patternCanvas.width, 10); // Bottom stripe
      
            patternCtx.fillStyle = cols_3; // Red color
            patternCtx.fillRect(0, 360, patternCanvas.width, 10); // Top stripe
            
            patternCtx.fillStyle = cols_4; // Red color
            patternCtx.fillRect(0, 380, patternCanvas.width, 10); // Top stripe



            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,530, patternCanvas.width, 30); // Bottom stripe



            patternCtx.fillStyle = cols_1; // Red color
            patternCtx.fillRect(0, 670, patternCanvas.width, 10); // Top stripe
      
            // Draw blue stripe at the bottom
            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,690, patternCanvas.width, 10); // Bottom stripe
      
            patternCtx.fillStyle = cols_3; // Red color
            patternCtx.fillRect(0, 710, patternCanvas.width, 10); // Top stripe
            
            patternCtx.fillStyle = cols_4; // Red color
            patternCtx.fillRect(0, 730, patternCanvas.width, 10); // Top stripe


            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,830, patternCanvas.width, 30); // Bottom stripe

            patternCtx.fillStyle = cols_2; // Blue color
            patternCtx.fillRect(0,1150, patternCanvas.width, 30); // Bottom stripe

            if (logo === 'footbed') {
              patternCtx.fillStyle = cols_2; // Blue color
              patternCtx.fillRect(0,0, 300, 530); // Bottom stripe
              patternCtx.fillRect(900,0, 500, 530); // Bottom stripe

            }
      
            patternImg = ctx.createPattern(patternCanvas, 'repeat-x');
            ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
            ctx.fillStyle = patternImg;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            break;
          case 'none':
          // Clear the pattern canvas to have no pattern
            patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
          break;
          default:
            return; // No pattern
}

  // const patternImg = ctx.createPattern(patternCanvas, 'repeat');
  // ctx.globalCompositeOperation = 'source-over'; // Ensure pattern is applied correctly
  // ctx.fillStyle = patternImg;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};
