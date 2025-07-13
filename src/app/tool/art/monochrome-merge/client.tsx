"use client";
import "./page.css";
import Image from "next/image";
import { PlaceholderImage } from "./img";
import { useState, useRef } from "react";

export default function MonochromeMergeClient() {
  const [lightImage, setLightImage] = useState<string | null>(null);
  const [darkImage, setDarkImage] = useState<string | null>(null);

  const lightInputRef = useRef<HTMLInputElement>(null);
  const darkInputRef = useRef<HTMLInputElement>(null);

  const handleLightImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setLightImage(event.target.result);
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
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
        <button className="start-process-button">Start Process</button>
      </div>
      <div className="image-output flexbox"></div>
    </>
  );
}
