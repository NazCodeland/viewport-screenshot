type LayoutMode = 'NONE' | 'HORIZONTAL' | 'VERTICAL';

if (figma.editorType === 'figma') {
  figma.showUI(__html__, {
    themeColors: true,
    width: 244 + 8,
    height: 1124,
    title: 'Viewport Screenshot',
  });

  figma.ui.onmessage = (msg) => {
    if (msg.type === 'data-viewport') {
      const MAX_IMAGE_HEIGHT = 4096; // this is the max height allowed per iamge in Figma.
      const figmaFrameLayout: LayoutMode = msg.options.figmaFrameLayout;
      const options = {
        url: msg.options.url,
        viewport: msg.options.viewport,
        imageHeight: MAX_IMAGE_HEIGHT,
      };

      console.log('options', options);
      const queryString = encodeURIComponent(JSON.stringify(options));
      const requestUrl = `http://localhost:3000/?options=${queryString}`;
      console.log(requestUrl);

      fetch(requestUrl)
        .then(async (response) => {
          return await response.json();
        })
        .then(async (images) => {
          try {
            const frames = [];
            let totalWidth = 0;
            let maxHeight = 0;

            for (const image of images) {
              const pngImage = figma.createImage(new Uint8Array(image.data));
              const { width, height } = await pngImage.getSizeAsync();
              const frame = figma.createFrame();
              frame.resize(width, height);
              frame.fills = [
                {
                  type: 'IMAGE',
                  imageHash: pngImage.hash,
                  scaleMode: 'FILL',
                },
              ];

              frames.push(frame);
              totalWidth += width;
              maxHeight = Math.max(maxHeight, height);
            }

            // Create a new frame to contain all the individual frames
            const containerFrame = figma.createFrame();
            const layoutMode: LayoutMode = figmaFrameLayout;
            containerFrame.name = options.url.split('https://')[1];
            containerFrame.resize(totalWidth, maxHeight);
            containerFrame.layoutMode = layoutMode;
            containerFrame.verticalPadding = 32;
            containerFrame.horizontalPadding = 32;
            containerFrame.primaryAxisSizingMode = 'AUTO'; // Automatically size based on children
            containerFrame.counterAxisSizingMode = 'AUTO'; // Automatically size based on children
            if (layoutMode === 'HORIZONTAL') {
              containerFrame.itemSpacing = 8;
            }

            // Add all frames to the container frame
            for (const frame of frames) {
              containerFrame.appendChild(frame);
            }
          } catch (error) {
            console.log('error', error);
          }
        })
        .catch((error) => {
          console.log('error', error);
          figma.notify('Failed to load image. Please check the URL.');
          // figma.closePlugin();
        });
    }
  };
}
