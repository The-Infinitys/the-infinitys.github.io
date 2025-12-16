"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { PlaceholderImage } from "./img";
import { useState, useRef, useEffect } from "react";

const processImageData = (
  imageData: ImageData,
  isLight: boolean
): ImageData => {
  const { data, width, height } = imageData;

  const histogram = (Array(256).fill(0) as number[]);
  for (let i = 0; i < data.length; i += 4) {
    const grayscale = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
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

  const outputData = new ImageData(width, height);
  const colorValue = isLight ? 0 : 255;

  for (let i = 0; i < data.length; i += 4) {
    const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const distance = Math.abs(grayscale - mostFrequentColor);
    const alpha = Math.min(distance * 2, 255);

    outputData.data[i] = colorValue;
    outputData.data[i + 1] = colorValue;
    outputData.data[i + 2] = colorValue;
    outputData.data[i + 3] = alpha * 0.5; // Set alpha to 50% of the calculated value
  }
  return outputData;
};

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
      reader.addEventListener("load", (event) => {
        if (event.target && typeof event.target.result === "string") {
          setLightImage(event.target.result);
          setProcessedImage(null);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDarkImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        if (event.target && typeof event.target.result === "string") {
          setDarkImage(event.target.result);
          setProcessedImage(null);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProcessImages = () => {
    if (!lightImage || !darkImage) {
      alert("Please select both a light and a dark image.");
      return;
    }

    const lightImg = new window.Image();
    const darkImg = new window.Image();

    const process = () => {
      let maxWidth = Math.max(lightImg.width, darkImg.width);
      let maxHeight = Math.max(lightImg.height, darkImg.height);
      const maxSize = 900;

      if (maxWidth > maxSize || maxHeight > maxSize) {
        if (maxWidth > maxHeight) {
          maxHeight = Math.round((maxSize / maxWidth) * maxHeight);
          maxWidth = maxSize;
        } else {
          maxWidth = Math.round((maxSize / maxHeight) * maxWidth);
          maxHeight = maxSize;
        }
      }

      // Scale and draw light image
      const lightCanvas = document.createElement("canvas");
      lightCanvas.width = maxWidth;
      lightCanvas.height = maxHeight;
      const lightCtx = lightCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!lightCtx) return;
      const lightScale = Math.min(
        maxWidth / lightImg.width,
        maxHeight / lightImg.height
      );
      const lightNewWidth = lightImg.width * lightScale;
      const lightNewHeight = lightImg.height * lightScale;
      const lightX = (maxWidth - lightNewWidth) / 2;
      const lightY = (maxHeight - lightNewHeight) / 2;
      lightCtx.drawImage(
        lightImg,
        lightX,
        lightY,
        lightNewWidth,
        lightNewHeight
      );
      const lightScaledData = lightCtx.getImageData(0, 0, maxWidth, maxHeight);

      // Scale and draw dark image
      const darkCanvas = document.createElement("canvas");
      darkCanvas.width = maxWidth;
      darkCanvas.height = maxHeight;
      const darkCtx = darkCanvas.getContext("2d", { willReadFrequently: true });
      if (!darkCtx) return;
      const darkScale = Math.min(
        maxWidth / darkImg.width,
        maxHeight / darkImg.height
      );
      const darkNewWidth = darkImg.width * darkScale;
      const darkNewHeight = darkImg.height * darkScale;
      const darkX = (maxWidth - darkNewWidth) / 2;
      const darkY = (maxHeight - darkNewHeight) / 2;
      darkCtx.drawImage(darkImg, darkX, darkY, darkNewWidth, darkNewHeight);
      const darkScaledData = darkCtx.getImageData(0, 0, maxWidth, maxHeight);

      // Process both scaled images
      const processedLight = processImageData(lightScaledData, true);
      const processedDark = processImageData(darkScaledData, false);

      // Composite the images by overlaying
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = maxWidth;
      outputCanvas.height = maxHeight;
      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) return;

      // Create temporary canvases to hold the processed ImageData
      const tempLightCanvas = document.createElement("canvas");
      tempLightCanvas.width = maxWidth;
      tempLightCanvas.height = maxHeight;
      tempLightCanvas.getContext("2d")?.putImageData(processedLight, 0, 0);

      const tempDarkCanvas = document.createElement("canvas");
      tempDarkCanvas.width = maxWidth;
      tempDarkCanvas.height = maxHeight;
      tempDarkCanvas.getContext("2d")?.putImageData(processedDark, 0, 0);

      // Draw the images on top of each other
      outputCtx.drawImage(tempDarkCanvas, 0, 0);
      outputCtx.drawImage(tempLightCanvas, 0, 0);

      setProcessedImage(outputCanvas.toDataURL("image/png"));
    };

    lightImg.addEventListener("load", () => {
      darkImg.addEventListener("load", process);
      darkImg.addEventListener("error", () =>
        alert("Failed to load dark image.")
      );
      darkImg.src = darkImage;
    });
    lightImg.addEventListener("error", () =>
      alert("Failed to load light image.")
    );
    lightImg.src = lightImage;
  };

  return (
    <>
      <div className={styles["image-input-flexbox"]}>
        <div className={styles["image-input"] + " " + styles.light}>
          <p onClick={() => lightInputRef.current?.click()}>Light Image</p>
          <input
            type="file"
            ref={lightInputRef}
            style={{ display: "none" }}
            onChange={handleLightImageSelect}
            accept="image/*"
          />
          <div className={styles["image-container"]}>
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
        <div className={styles["image-input"] + " " + styles.dark}>
          <p onClick={() => darkInputRef.current?.click()}>Dark Image</p>
          <input
            type="file"
            ref={darkInputRef}
            style={{ display: "none" }}
            onChange={handleDarkImageSelect}
            accept="image/*"
          />
          <div className={styles["image-container"]}>
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
      <div className={styles.start}>
        <button
          className={styles["start-process-button"]}
          onClick={handleProcessImages}
        >
          Start Process
        </button>
      </div>
      {processedImage && (
        <div className={styles["image-output"]}>
          <div
            className={styles["image-container"]}
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
            className={styles["download-button"]}
          >
            Download Image
          </a>
        </div>
      )}
    </>
  );
}
