import React, { useState, useRef } from 'react';
import './ImageMagnifier.css';

const ImageMagnifier = ({ src, zoom = 2 }) => {
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition,
        backgroundSize: `${zoom * 100}%`,
      }}
      onMouseMove={handleMouseMove}
      ref={imageRef}
    >
      <img src={src[0]} alt="Zoomed" className="main-image" />
    </div>
  );
};

export default ImageMagnifier;
