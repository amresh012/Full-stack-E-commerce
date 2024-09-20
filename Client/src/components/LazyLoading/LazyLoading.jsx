import React, { useState } from "react";

const LazyImage = ({ src, alt, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Placeholder Image (blurred version) */}
      <img
        src={placeholder}
        alt={alt}
        style={{
          width: "100%",
          filter: "blur(20px)",
          transition: "opacity 0.5s ease",
          opacity: isLoaded ? 0 : 1, // Hide placeholder once the real image is loaded
          position: isLoaded ? "absolute" : "relative",
        }}
      />

      {/* Actual Image (lazy loading) */}
      <img
        src={src}
        alt={alt}
        loading="lazy" // HTML5 lazy loading
        style={{
          width: "100%",
          transition: "filter 0.5s ease, opacity 0.5s ease", // Smooth transition for the blur effect
          filter: isLoaded ? "blur(0px)" : "blur(20px)", // Blur until loaded
          opacity: isLoaded ? 1 : 0, // Fade in image once loaded
        }}
        onLoad={() => setIsLoaded(true)} // When image is fully loaded
      />
    </div>
  );
};

export default LazyImage;
