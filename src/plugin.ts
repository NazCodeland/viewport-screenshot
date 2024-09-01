// 
// 

if (figma.editorType === "figma") {
  figma.showUI(__html__, {
    themeColors: true,
    width: 244 + 8,
    height: 1124,
    title: "Viewport Screenshot",
  });

  figma.ui.onmessage = (msg) => {
    if (msg.type === "data-viewport") {
      const url = encodeURIComponent(msg.options.url);
      const viewport = JSON.stringify(msg.options.viewport);

      fetch(`http://localhost:3000?viewport=${viewport}&url=${url}`)
        .then(async (response) => {
          console.log('response', response);
          return response.arrayBuffer();
        })
        .then(async (buffer) => {
          console.log('buffer', buffer);

          const fileSig = new Uint8Array(buffer.slice(0, 8));
          const imageHeader = new Uint8Array(buffer.slice(8, 33));
          const imageData = new Uint8Array(buffer.slice(33, buffer.byteLength - 12));
          const end = new Uint8Array(buffer.slice(buffer.byteLength - 12));

          const firstCombined = new Uint8Array(fileSig.length + imageHeader.length + imageData.length + end.length);

          firstCombined.set(fileSig, 0);
          firstCombined.set(imageHeader, fileSig.length);
          firstCombined.set(imageData, fileSig.length + imageHeader.length);
          firstCombined.set(end, fileSig.length + imageHeader.length + imageData.length);

          const image = figma.createImage(firstCombined);
          return image;
        })
        .then(async (image) => {

          const { width, height } = await image.getSizeAsync();
          const frame = figma.createFrame();

          frame.resize(width, height);
          frame.fills = [
            {
              type: 'IMAGE',
              imageHash: image.hash,
              scaleMode: 'FILL'
            },
          ];

        })
        .catch((error) => {
          console.log('error', error);
          figma.notify("Failed to load image. Please check the URL.");
          // figma.closePlugin();
        });
    }
  };
}
