function fitTextToCanvas(ctx, text, maxWidth, fs) {
    let fontSize = fs; // Start with a large font size
    let textWidth;
  
    // Set initial font size
    ctx.font = `${fontSize}px Poppins`;
  
    // Measure text width
    textWidth = ctx.measureText(text).width;
  
    // Adjust font size until the text fits within the maxWidth
    while (textWidth > maxWidth && fontSize > 10) { // Avoid too small font size
      fontSize -= 1; // Decrease font size
      ctx.font = `${fontSize}px Poppins`;
      textWidth = ctx.measureText(text).width;
    }
  
    return fontSize;
}
  
export function drawVerticalText(ctx, text, canvas, color,placement) {
    switch (placement) {
      case 'bottom':
          // Define max width for text to fit within
          const maxWidthB = canvas.width * 0.4; // Example: 80% of canvas width

          // Determine the appropriate font size
          const fontSizeB = fitTextToCanvas(ctx, text, maxWidthB,40);

          ctx.font = `${fontSizeB}px Poppins`;
        
          // Measure the adjusted text width
          const textWidthB = ctx.measureText(text).width;
          // Save the current context state
          ctx.save();

          // Translate the context to the desired position (center of the canvas)
          ctx.translate(canvas.width / 2, canvas.height / 2);

          // Rotate the context by 90 degrees (for vertical text)
          ctx.rotate(-Math.PI / 2); // Rotating counterclockwise

          // Flip the canvas horizontally to prevent mirrored text
          ctx.scale(-1, 1);

          // Set the text color
          ctx.fillStyle = color; // Set dynamic text color

          const rightHalfX = canvas.width * -0.25; // Move to right half of canvas
          const x = rightHalfX - textWidthB / 2; // Center the text within the right half

          // Draw the text

          // console.log(canvas.height,canvas.width);
          
          ctx.fillText(text, x, 620);
          ctx.fillText(text, x, -580);

          // Restore the context to its original state
          ctx.restore();

          // Return the context
          return ctx;
        case 'Front':
                  // Define max width for text to fit within
          const maxWidthF = canvas.width * 0.8; // Example: 80% of canvas width
      
          // Determine the appropriate font size
          const fontSizeF = fitTextToCanvas(ctx, text, maxWidthF,70);

          ctx.font = `${fontSizeF}px Poppins`;
        
          // Measure the adjusted text width
          const textWidthF = ctx.measureText(text).width;
          // Save the current context state
          ctx.save();
        
          // Translate the context to the desired position (center of the canvas)
          ctx.translate(canvas.width / 2, canvas.height / 2);
        
          // Rotate the context by 90 degrees (for vertical text)
          ctx.rotate(-Math.PI / 2); // Rotating counterclockwise
        
          // Flip the canvas horizontally to prevent mirrored text
          ctx.scale(-1, 1);
        
          // Set the text color
          ctx.fillStyle = color; // Set dynamic text color
        
          // Calculate the x position to center the text
          const x1 = -textWidthF / 2; // Adjusting x position to center the text horizontally
        
          // Draw the text
          ctx.fillText(text, x1, 0);
        
          // Restore the context to its original state
          ctx.restore();
        
          // Return the context
          return ctx;
    }

}

