"use client";
import "./page.css";
import Image from "next/image";
import { PlaceholderImage } from "./img";
import { useState, useRef, useEffect } from "react";

export default function MonochromeMergeClient() {
  const [lightImage, setLightImage] = useState<string | null>(null);
  const [darkImage, setDarkImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [background, setBackground] = useState("white");

  const lightInputRef = useRef<HTMLInputElement>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (processedImage) {
      const interval = setInterval(() => {
        setBackground((bg) => (bg === "white" ? "black" : "white"));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [processedImage]);

  const handleLightImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setLightImage(event.target.result);
          setProcessedImage(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDarkImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setDarkImage(event.target.result);
          setProcessedImage(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const processImage = (
    img: HTMLImageElement,
    isLight: boolean
  ): ImageData | null => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    const histogram = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) {
      const grayscale = Math.round(
        (data[i] + data[i + 1] + data[i + 2]) / 3
      );
      histogram[grayscale]++;
    }

    let mostFrequentColor = 0;
    let maxCount = 0;
    histogram.forEach((count, color) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentColor = color;
      }
    });

    const outputData = ctx.createImageData(img.width, img.height);
    const colorValue = isLight ? 0 : 255;

    for (let i = 0; i < data.length; i += 4) {
      const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const distance = Math.abs(grayscale - mostFrequentColor);
      const alpha = Math.min(distance * 2, 255); // Amplify transparency effect

      outputData.data[i] = colorValue;
      outputData.data[i + 1] = colorValue;
      outputData.data[i + 2] = colorValue;
      outputData.data[i + 3] = alpha;
    }
    return outputData;
  };

  const handleProcessImages = () => {
    if (!lightImage || !darkImage) {
      alert("Please select both a light and a dark image.");
      return;
    }

    const lightImg = new window.Image();
    const darkImg = new window.Image();

    const process = () => {
      const processedLight = processImage(lightImg, true);
      const processedDark = processImage(darkImg, false);

      if (!processedLight || !processedDark) {
        alert("Failed to process one or both images.");
        return;
      }

      const maxWidth = Math.max(lightImg.width, darkImg.width);
      const maxHeight = Math.max(lightImg.height, darkImg.height);

      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = maxWidth;
      outputCanvas.height = maxHeight;
      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) return;

      // Create temporary canvases to hold the processed data
      const lightCanvas = document.createElement("canvas");
      lightCanvas.width = processedLight.width;
      lightCanvas.height = processedLight.height;
      lightCanvas.getContext("2d")?.putImageData(processedLight, 0, 0);

      const darkCanvas = document.createElement("canvas");
      darkCanvas.width = processedDark.width;
      darkCanvas.height = processedDark.height;
      darkCanvas.getContext("2d")?.putImageData(processedDark, 0, 0);

      // Draw the processed images onto the output canvas, letting the browser handle alpha blending
      outputCtx.drawImage(darkCanvas, 0, 0, maxWidth, maxHeight);
      outputCtx.drawImage(lightCanvas, 0, 0, maxWidth, maxHeight);

      setProcessedImage(outputCanvas.toDataURL("image/png"));
    };

    lightImg.onload = () => {
      darkImg.onload = process;
      darkImg.onerror = () => alert("Failed to load dark image.");
      darkImg.src = darkImage;
    };
    lightImg.onerror = () => alert("Failed to load light image.");
    lightImg.src = lightImage;
  };

  return (
    <>
      <div className="image-input-flexbox">
        <div className="image-input light">
          <p onClick={() => lightInputRef.current?.click()}>Light Image</p>
          <input
            type="file"
            ref={lightInputRef}
            style={{ display: "none" }}
            onChange={handleLightImageSelect}
            accept="image/*"
          />
          <div className="image-container">
            {lightImage ? (
              <Image
                width={400}
                height={400}
                alt="light-image"
                src={lightImage}
              ></Image>
            ) : (
              <div
                onClick={() => lightInputRef.current?.click()}
                style={{ cursor: "pointer" }}
              >
                <PlaceholderImage />
              </div>
            )}
          </div>
        </div>
        <div className="image-input dark">
          <p onClick={() => darkInputRef.current?.click()}>Dark Image</p>
          <input
            type="file"
            ref={darkInputRef}
            style={{ display: "none" }}
            onChange={handleDarkImageSelect}
            accept="image/*"
          />
          <div className="image-container">
            {darkImage ? (
              <Image
                width={400}
                height={400}
                alt="dark-image"
                src={darkImage}
              ></Image>
            ) : (
              <div
                onClick={() => darkInputRef.current?.click()}
                style={{ cursor: "pointer" }}
              >
                <PlaceholderImage />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="start">
        <button className="start-process-button" onClick={handleProcessImages}>
          Start Process
        </button>
      </div>
      {processedImage && (
        <div className="image-output">
          <div
            className="image-container"
            style={{
              backgroundColor: background,
              transition: "background-color 0.5s ease",
            }}
          >
            <Image
              width={300}
              height={300}
              alt="processed-image"
              src={processedImage}
            />
          </div>
          <a
            href={processedImage}
            download="monochrome-merged.png"
            className="download-button"
          >
            Download Image
          </a>
        </div>
      )}
    </>
  );
}
