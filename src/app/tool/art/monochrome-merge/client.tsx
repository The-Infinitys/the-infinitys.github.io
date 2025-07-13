"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";

const MonochromeMergeClient: React.FC = () => {
  const t = useTranslations("pages.tool.art.monochrome-merge");
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [mergedImage, setMergedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const getAverageBrightness = (imageData: ImageData): number => {
    let sumBrightness = 0;
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Calculate luminance (perceived brightness)
      sumBrightness += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    }
    return sumBrightness / (data.length / 4);
  };

  const processImage = (img: HTMLImageElement, targetWidth: number, targetHeight: number, isDarkImage: boolean): ImageData => {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) throw new Error("Could not get canvas context");

    // Calculate aspect ratio to fit image within target dimensions
    const imgAspectRatio = img.width / img.height;
    const targetAspectRatio = targetWidth / targetHeight;

    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspectRatio > targetAspectRatio) {
      // Image is wider than target, fit by width
      drawHeight = targetWidth / imgAspectRatio;
      offsetY = (targetHeight - drawHeight) / 2;
    } else {
      // Image is taller than target, fit by height
      drawWidth = targetHeight * imgAspectRatio;
      offsetX = (targetWidth - drawWidth) / 2;
    }

    tempCanvas.width = targetWidth;
    tempCanvas.height = targetHeight;

    // Draw image centered, maintaining aspect ratio
    tempCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    const imageData = tempCtx.getImageData(0, 0, targetWidth, targetHeight);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Convert to grayscale (luminance method)
      const gray = (r * 0.299 + g * 0.587 + b * 0.114);
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;

      // Adjust transparency based on grayscale value
      // Dark image: black becomes transparent (alpha 0), white becomes opaque (alpha 255)
      // Light image: white becomes transparent (alpha 0), black becomes opaque (alpha 255)
      if (isDarkImage) {
        data[i + 3] = gray; // Black (0) -> transparent, White (255) -> opaque
      } else {
        data[i + 3] = 255 - gray; // White (255) -> transparent, Black (0) -> opaque
      }
    }
    return imageData;
  };

  const mergeImages = async () => {
    if (!image1 || !image2) {
      alert(t("uploadTwoImages"));
      return;
    }

    try {
      const img1 = await loadImage(image1);
      const img2 = await loadImage(image2);

      // Determine overall dimensions for consistency
      const targetWidth = Math.max(img1.width, img2.width);
      const targetHeight = Math.max(img1.height, img2.height);

      // Create temporary canvases to get image data for brightness calculation
      const tempCanvas1 = document.createElement("canvas");
      const tempCtx1 = tempCanvas1.getContext("2d");
      if (!tempCtx1) throw new Error("Could not get canvas context");
      tempCanvas1.width = img1.width;
      tempCanvas1.height = img1.height;
      tempCtx1.drawImage(img1, 0, 0);
      const initialImageData1 = tempCtx1.getImageData(0, 0, img1.width, img1.height);

      const tempCanvas2 = document.createElement("canvas");
      const tempCtx2 = tempCanvas2.getContext("2d");
      if (!tempCtx2) throw new Error("Could not get canvas context");
      tempCanvas2.width = img2.width;
      tempCanvas2.height = img2.height;
      tempCtx2.drawImage(img2, 0, 0);
      const initialImageData2 = tempCtx2.getImageData(0, 0, img2.width, img2.height);

      const brightness1 = getAverageBrightness(initialImageData1);
      const brightness2 = getAverageBrightness(initialImageData2);

      let darkImageSrc = brightness1 < brightness2 ? image1 : image2;
      let lightImageSrc = brightness1 < brightness2 ? image2 : image1;

      const processedImg1 = await loadImage(darkImageSrc);
      const processedImg2 = await loadImage(lightImageSrc);

      const imageDataDark = processImage(processedImg1, targetWidth, targetHeight, true);
      const imageDataLight = processImage(processedImg2, targetWidth, targetHeight, false);

      const finalCanvas = canvasRef.current;
      if (!finalCanvas) return;
      const finalCtx = finalCanvas.getContext("2d");
      if (!finalCtx) return;

      finalCanvas.width = targetWidth;
      finalCanvas.height = targetHeight;

      const finalImageData = finalCtx.createImageData(targetWidth, targetHeight);
      const finalData = finalImageData.data;

      // Chessboard merge
      for (let y = 0; y < targetHeight; y++) {
        for (let x = 0; x < targetWidth; x++) {
          const index = (y * targetWidth + x) * 4;

          if ((x + y) % 2 === 0) {
            // Even cells: use dark image data
            finalData[index] = imageDataDark.data[index];
            finalData[index + 1] = imageDataDark.data[index + 1];
            finalData[index + 2] = imageDataDark.data[index + 2];
            finalData[index + 3] = imageDataDark.data[index + 3];
          } else {
            // Odd cells: use light image data
            finalData[index] = imageDataLight.data[index];
            finalData[index + 1] = imageDataLight.data[index + 1];
            finalData[index + 2] = imageDataLight.data[index + 2];
            finalData[index + 3] = imageDataLight.data[index + 3];
          }
        }
      }

      finalCtx.putImageData(finalImageData, 0, 0);
      setMergedImage(finalCanvas.toDataURL("image/png"));

    } catch (error) {
      console.error("Error merging images:", error);
      alert(t("mergeError") + (error as Error).message);
    }
  };

  const downloadImage = () => {
    if (mergedImage) {
      const link = document.createElement("a");
      link.href = mergedImage;
      link.download = "monochrome_merged_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="monochrome-merge-container">
      <div className="image-inputs">
        <div className="image-input-group">
          <label htmlFor="image1-upload">{t("uploadImage1")}</label>
          <input type="file" id="image1-upload" accept="image/*" onChange={(e) => handleImageUpload(e, setImage1)} />
          {image1 && <img src={image1} alt="Image 1" className="uploaded-image" />}
        </div>
        <div className="image-input-group">
          <label htmlFor="image2-upload">{t("uploadImage2")}</label>
          <input type="file" id="image2-upload" accept="image/*" onChange={(e) => handleImageUpload(e, setImage2)} />
          {image2 && <img src={image2} alt="Image 2" className="uploaded-image" />}
        </div>
      </div>

      <button onClick={mergeImages} disabled={!image1 || !image2}>
        {t("mergeImages")}
      </button>

      {mergedImage && (
        <div className="merged-image-output">
          <h3>{t("mergedImage")}:</h3>
          <canvas ref={canvasRef} style={{ maxWidth: "100%", height: "auto" }}></canvas>
          <button onClick={downloadImage}>{t("downloadMergedImage")}</button>
        </div>
      )}
    </div>
  );
};

export default MonochromeMergeClient;