import React, {  useState } from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Card, Button } from "react-bootstrap";

interface Slide {
  img: string;
}

const ProductSlider: React.FC = () => {
  const [slides] = useState<Slide[]>([
    { img: "https://dummyimage.com/600x400/000/7CFC00" },
    { img: "https://dummyimage.com/600x400/000/ccccc" },
    { img: "https://dummyimage.com/600x400/000/dddddd" },
    { img: "https://dummyimage.com/600x400/000/fff" },
    { img: "https://dummyimage.com/600x400/000/B22222" },
    { img: "https://dummyimage.com/600x400/000/7CFC00" },
    { img: "https://dummyimage.com/600x400/000/ccccc" },
    { img: "https://dummyimage.com/600x400/000/dddddd" },
    { img: "https://dummyimage.com/600x400/000/B22222" },
    { img: "https://dummyimage.com/600x400/000/7CFC00" },
  ]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div>
      <h2> Responsive Product Carousel</h2>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <ProductCard imgSrc={slide.img} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

interface ProductCardProps {
  imgSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imgSrc }) => (
  <Card style={{ width: "inherit" }}>
    <Card.Img variant="top" src={imgSrc} />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
      <div className="product-actions">
        <Button variant="primary">Buy Now</Button>
        <Button variant="secondary">Add to cart</Button>
      </div>
    </Card.Body>
  </Card>
);

export default ProductSlider;
