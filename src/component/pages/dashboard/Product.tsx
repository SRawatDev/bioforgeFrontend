import { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { defaultConfig } from "../../../config";

interface userInfo {
  _id: string;
  username: string;
  email: string;
  social: CustomLink[];
  non_social: CustomLink[];
  bio: string;
  banner_img: string;
  profile_img: string;
  theme: theme;
}

interface videoInterface {
  _id?: string,
  videoLink?: string
}

interface productInterface {
  _id?: string;
  title?: string;
  image?: string
  link?: string
}

interface theme {
  fontFamily: string;
  is_colorImage: string;
  fontColor: string;
  themeDesign?: string;
}

interface CustomLink {
  LinkCategoryId?: productInterface[]
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  is_index: number;
  video?: videoInterface
  _id: string;
}

const ProductCarousel: React.FC<{
  products: productInterface[];
  userInfo: userInfo | null;
}> = ({ products, userInfo }) => {
  console.log("hcsdhgsdhfgsd", products);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dimensions, setDimensions] = useState({ width: 250, height: 150 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const parent = containerRef.current.parentElement;
        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        
        const newWidth = Math.max(200, Math.min(parentWidth * 0.95, 400)); 
        const newHeight = Math.max(120, Math.min(parentHeight * 0.8, 200));
        
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    
    if (containerRef.current && containerRef.current.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!products || products.length === 0) return null;

  const slideWidth = dimensions.width - 20; 
  const imageSize = Math.min(dimensions.height * 0.5, dimensions.width * 0.3);
  const fontSize = Math.max(10, Math.min(dimensions.width * 0.04, 16));
  const titleFontSize = Math.max(11, Math.min(dimensions.width * 0.045, 18));

  return (
    <div
      ref={containerRef}
      className="product-carousel"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: `${dimensions.width}px`,
        minHeight: `${dimensions.height}px`,
        margin: "8px auto",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          transform: `translateX(-${currentIndex * slideWidth}px)`,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: "100%",
          width: `${products.length * slideWidth}px`,
        }}
      >
        {products.map((item, index) => (
          <div
            key={item._id || index}
            style={{
              width: `${slideWidth}px`,
              height: "100%",
              flexShrink: 0,
              padding: `${dimensions.height * 0.02}px ${dimensions.width * 0.02}px`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxSizing: "border-box",
              marginTop: '10px',
              marginLeft: '10px',

            }}
          >
            {item.image && (
              <img
                src={defaultConfig?.imagePath + item.image}
                alt={item.title || "Product"}
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: `${dimensions.height * 0.05}px`,
                  flexShrink: 0,
                }}
              />
            )}
            <h4
              style={{
                fontFamily: userInfo?.theme?.fontFamily,
                color: userInfo?.theme?.fontColor || "white",
                fontSize: `${titleFontSize}px`,
                margin: `0 0 ${dimensions.height * 0.05}px 0`,
                fontWeight: "600",
                lineHeight: "1.2",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                maxWidth: "100%",
                textAlign: "center",
              }}
            >
              <RouterLink 
                to={item?.link || "#"} 
                target="blank"  
                style={{
                  display: "inline-block",
                  padding: `${dimensions.height * 0.04}px ${dimensions.width * 0.04}px`,
                  color: userInfo?.theme?.fontColor || "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: `${fontSize}px`,
                  fontFamily: userInfo?.theme?.fontFamily,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {item.title}
              </RouterLink>
            </h4>
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: `${dimensions.width * 0.02}px`,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "none",
              borderRadius: "50%",
              width: `${Math.max(20, dimensions.width * 0.08)}px`,
              height: `${Math.max(20, dimensions.width * 0.08)}px`,
              color: "white",
              cursor: "pointer",
              fontSize: `${Math.max(10, dimensions.width * 0.04)}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              transition: "all 0.2s ease",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: `${dimensions.width * 0.02}px`,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "none",
              borderRadius: "50%",
              width: `${Math.max(20, dimensions.width * 0.08)}px`,
              height: `${Math.max(20, dimensions.width * 0.08)}px`,
              color: "white",
              cursor: "pointer",
              fontSize: `${Math.max(10, dimensions.width * 0.04)}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              transition: "all 0.2s ease",
            }}
          >
            ›
          </button>
        </>
      )}

      {products.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: `${dimensions.height * 0.05}px`,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: `${Math.max(4, dimensions.width * 0.015)}px`,
          }}
        >
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: `${Math.max(4, dimensions.width * 0.015)}px`,
                height: `${Math.max(4, dimensions.width * 0.015)}px`,
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  index === currentIndex
                    ? userInfo?.theme?.fontColor || "white"
                    : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                transform: index === currentIndex ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: `${dimensions.height * 0.03}px`,
          right: `${dimensions.width * 0.03}px`,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontSize: `${Math.max(8, dimensions.width * 0.025)}px`,
          padding: `${dimensions.height * 0.01}px ${dimensions.width * 0.02}px`,
          borderRadius: "10px",
          fontFamily: userInfo?.theme?.fontFamily,
        }}
      >
        {currentIndex + 1} / {products.length}
      </div>
    </div>
  );
};

export default ProductCarousel;