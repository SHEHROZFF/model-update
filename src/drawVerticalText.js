function fitTextToCanvas(ctx, text, maxWidth) {
    let fontSize = 70; // Start with a large font size
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

        // Define max width for text to fit within
        const maxWidth = canvas.width * 0.8; // Example: 80% of canvas width
    
        // Determine the appropriate font size
        const fontSize = fitTextToCanvas(ctx, text, maxWidth);
      
        // Measure the adjusted text width
        const textWidth = ctx.measureText(text).width;
 
    switch (placement) {
      case 'bottom':
          // Save the current context state
          // ctx.save();

          // Translate the context to the desired position (center of the canvas)
          ctx.translate(canvas.width / 2, canvas.height / 2);

          // Rotate the context by 90 degrees (for vertical text)
          ctx.rotate(-Math.PI / 2); // Rotating counterclockwise

          // Flip the canvas horizontally to prevent mirrored text
          ctx.scale(-1, 1);

          // Set the text color
          ctx.fillStyle = color; // Set dynamic text color

          const rightHalfX = canvas.width * -0.25; // Move to right half of canvas
          const x = rightHalfX - textWidth / 2; // Center the text within the right half

          // Draw the text

          // console.log(canvas.height,canvas.width);
          
          ctx.fillText(text, x, 620);
          ctx.fillText(text, x, -580);

          // Restore the context to its original state
          ctx.restore();

          // Return the context
          return ctx;
        case 'Front':
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
          const x1 = -textWidth / 2; // Adjusting x position to center the text horizontally
        
          // Draw the text
          ctx.fillText(text, x1, 0);
        
          // Restore the context to its original state
          ctx.restore();
        
          // Return the context
          return ctx;
    }

}

