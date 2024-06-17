import React, { useState } from "react";

interface ImageProps {
  src: string;
  width: number | string;
  height: number | string;
  wrapClassName?: string;
  imgClassName?: string;
  placeholderClassName?: string;
  alt?: string;
  placeholder?: string;
  vertical?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  wrapClassName,
  imgClassName,
  placeholderClassName,
  alt = "IMG",
  width,
  height,
  placeholder,
  vertical,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const validFormats = /\.(png|svg|jpe?g|webp|eps|tiff?)$/i;
    if (!validFormats.test(src)) {
      setIsLoaded(null);
      console.error("🚫 Invalid image format");
    } else {
      if (isLoaded === null) {
        setIsLoaded(false);
      }
    }
  }, [src]);

  if (isLoaded === null) {
    return (
      // error format
      <div
        className={wrapClassName}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "6px",
            boxShadow:
              "inset 0 0 4px 1px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: "12px",
            lineHeight: "20px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
            }}
          >
            🖼️
          </div>
          {alt}
        </div>
      </div>
    );
  }

  return (
    <div
      className={wrapClassName}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{
          display: isLoaded ? "block" : "none",
          width: `${vertical ? "auto" : "100%"}`,
          height: `${vertical ? "100%" : "auto"}`,
          objectFit: "cover",
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => (setIsLoaded(null), console.error("🚫 Image not faund"))}
      />

      {!isLoaded && placeholder && (
        // placeholder
        <img
          src={placeholder}
          alt={alt}
          className={placeholderClassName}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${vertical ? "auto" : "100%"}`,
            height: `${vertical ? "100%" : "auto"}`,
            objectFit: "cover",
          }}
        />
      )}

      {!isLoaded && isLoaded !== null && !placeholder && (
        // loading
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "6px",
            boxShadow:
              "inset 0 0 4px 1px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
          }}
        ></div>
      )}

      {!isLoaded && isLoaded === null && !placeholder && (
        // error not found
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "6px",
            boxShadow:
              "inset 0 0 4px 1px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: "12px",
            lineHeight: "20px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
            }}
          >
            🖼️
          </div>
          {alt}
        </div>
      )}
    </div>
  );
};

export default Image;
