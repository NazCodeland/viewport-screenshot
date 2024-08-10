if (figma.editorType === 'figma') {

  // Show the UI
  figma.showUI(__html__, { themeColors: true, height: 672, width: 1200, title: "URL Screenshot" });

  figma.ui.onmessage = (msg) => {
    console.log('server', { msg });

    if (msg.type === 'load-image') {
      console.log({ msg });
      const madeURL = encodeURIComponent(msg.urlToScreenshot);
      console.log({ madeURL });
      fetch(`http://localhost:3000/desktop?url=${madeURL}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.arrayBuffer();
        })
        .then(async buffer => {
          const uint8Array = new Uint8Array(buffer);
          console.log({ uint8Array });

          // // Create an image in Figma using the Uint8Array
          // const image = figma.createImage(uintArray);
          // console.log({ 'width': ' height' });

          // // Create a rectangle node
          // const node = figma.createRectangle();

          // // Get the size of the image
          // const { width, height } = await image.getSizeAsync();
          // node.resize(width, height);

          // // Render the image by filling the rectangle
          // node.fills = [
          //   {
          //     type: 'IMAGE',
          //     imageHash: image.hash,
          //     scaleMode: 'FILL'
          //   }
          // ];

          // Post message to Figma UI
          figma.ui.postMessage({ type: 'image', uint8Array });
        })
        .catch(error => {
          console.error('Error fetching image:', error);
          figma.notify('Failed to load image. Please check the URL.');
        });
    }
  };
}
