// src/App.js
import React, { useState, useRef } from 'react';
import './App.css';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import Draggable from 'react-draggable'; // for repositioning
import InputSlider from 'react-input-slider'; // for resizing

const App = () => {
  const [image, setImage] = useState(null);
  const [tshirtStyle, setTshirtStyle] = useState('white'); // T-shirt style
  const [scale, setScale] = useState(1); // for resizing
  const tShirtRef = useRef(null);

  // Handle file upload and set the image state
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download the t-shirt preview as an image
  const handleDownload = () => {
    if (tShirtRef.current) {
      htmlToImage.toBlob(tShirtRef.current).then((blob) => {
        saveAs(blob, 'tshirt-preview.png');
      });
    }
  };

  return (
    <div className="App">
      <h1>Custom T-shirt Designer</h1>

      {/* File Input for uploading design */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* T-shirt Color Options */}
      <div className="tshirt-options">
        <label>
          Select T-shirt Style: 
          <select onChange={(e) => setTshirtStyle(e.target.value)}>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
          </select>
        </label>
      </div>

      {/* Resizing slider */}
      {image && (
        <div className="resize-slider">
          <label>Resize Design: </label>
          <InputSlider
            axis="x"
            x={scale}
            xmax={2}
            xmin={0.5}
            xstep={0.01}
            onChange={({ x }) => setScale(x)} // Update scale state
          />
        </div>
      )}

      <div className="tshirt-container">
        {/* T-shirt Preview */}
        <div className="tshirt-preview" ref={tShirtRef}>
          <img
            src={`/tshirt-${tshirtStyle}.png`} // Dynamic T-shirt style
            alt="T-shirt"
            className="tshirt-base"
          />
          {image && (
            <Draggable>
              <img
                src={image} // Uploaded design
                alt="Design"
                className="tshirt-design"
                style={{
                  width: `${scale * 200}px`, // Scale the width based on scale value
                  height: 'auto',
                }}
              />
            </Draggable>
          )}
        </div>
      </div>

      {/* Download Button */}
      <button onClick={handleDownload} disabled={!image}>
        Download T-shirt Preview
      </button>
    </div>
  );
};

export default App;
