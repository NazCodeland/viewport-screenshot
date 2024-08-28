import clientStorage from "./clientStorage";
import { Dimension } from "./types.js";

// application loads
// 1. check for dimensions data:
// i. check if data exists, else, return initial data
// ii. link the dimension item edits to input handlers

async function setupPlugin() {
  const initialDimensions: Dimension[] = [
    {
      deviceType: "mobile",
      deviceName: "Pixel 8 Pro",
      width: 448,
      height: 998,
      zoom: 100,
    },
    {
      deviceType: "mobile",
      deviceName: "Pixel 7A",
      width: 412,
      height: 915,
      zoom: 100,
    },
    {
      deviceType: "mobile",
      deviceName: "iPhone 15 Pro Max",
      width: 430,
      height: 932,
      zoom: 100,
    },
    {
      deviceType: "mobile",
      deviceName: "iPhone SE",
      width: 320,
      height: 568,
      zoom: 100,
    },
    {
      deviceType: "laptop",
      deviceName: "MacBook Air 13-inch M3",
      width: 1440,
      height: 900,
      zoom: 100,
    },
  ];

  async function setDimensions(dimensions: Dimension[]) {
    await clientStorage.setValue("dimensions", JSON.stringify(dimensions));
  }

  async function getDimensions() {
    const storedDimensions = await clientStorage.getValue("dimensions");
    if (storedDimensions) {
      return storedDimensions;
    }
    setDimensions(initialDimensions);
    return initialDimensions;
  }

  const dimensions = await getDimensions();
  figma.ui.postMessage({ type: "data-dimensions", dimensions });
}

if (figma.editorType === "figma") {
  // figma.showUI(__html__, { themeColors: true, width: 244, height: 1124, title: "URL Screenshot" });
  figma.showUI(__html__, {
    themeColors: true,
    width: 244 + 8,
    height: 1124,
    title: "URL Screenshot",
  });
  setupPlugin();

  figma.ui.onmessage = (msg) => {
    if (msg.type === "load-image") {
      const madeURL = encodeURIComponent(msg.urlToScreenshot);
      fetch(`http://localhost:3000/?url=${madeURL}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.arrayBuffer();
        })
        .then(async (buffer) => {
          const uint8Array = new Uint8Array(buffer);

          // // Create an image in Figma using the Uint8Array
          // const image = figma.createImage(uintArray);

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
          figma.ui.postMessage({ type: "image", uint8Array });
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          figma.notify("Failed to load image. Please check the URL.");
        });
    }

    if (msg.type === "resize-figma-plugin") {
      let { width, height } = msg.options;
      width = width + 32;
      height = height + 32;
      figma.ui.resize(width, height);
    }
  };
}
