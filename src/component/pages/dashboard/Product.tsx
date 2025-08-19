import { useState } from "react";
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
  console.log("hcsdhgsdhfgsd",products)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  return (
    <div
      className="product-carousel"
      style={{
        position: "relative",
        width: "240px",
        height: "140px",
        margin: "8px auto",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Carousel Container */}
      <div
        style={{
          display: "flex",
          transform: `translateX(-${currentIndex * 240}px)`, // slide by width
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: "100%",
          width: `${products.length * 240}px`,
        }}
      >
        {products.map((item, index) => (
          <div
            key={item._id || index}
            style={{
              width: "240px", // Fixed width for each slide
              height: "100%",
              flexShrink: 0,
              padding: "2px 3px 0px 5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {item.image && (
              <img
                src={defaultConfig?.imagePath + item.image}
                alt={item.title || "Product"}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "8px",
                  flexShrink: 0,
                }}
              />
            )}
            <h4
              style={{
                fontFamily: userInfo?.theme?.fontFamily,
                color: userInfo?.theme?.fontColor || "white",
                fontSize: "13px",
                margin: "0 0 8px 0",
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
              <RouterLink to={item?.link || "#"} target="blank"  style={{
                  display: "inline-block",
                  padding: "6px 12px",
                
                  color: userInfo?.theme?.fontColor || "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontFamily: userInfo?.theme?.fontFamily,
                 
                  transition: "all 0.2s ease",
                  flexShrink: 0,

                }}>
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
              left: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              color: "white",
              cursor: "pointer",
              fontSize: "12px",
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
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              color: "white",
              cursor: "pointer",
              fontSize: "12px",
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
            bottom: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: "6px",
                height: "6px",
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
          top: "5px",
          right: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontSize: "9px",
          padding: "2px 6px",
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