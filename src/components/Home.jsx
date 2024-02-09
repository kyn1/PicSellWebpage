import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from '../layout/Button.jsx';
import img1 from '../assets/slide1.jpeg'
import img2 from '../assets/slide2.jpeg';
import img3 from '../assets/slide3.jpeg';

const Home = () => {
  return (
    <div className="min-h-[70vh] mx-5 mt-10">
      <Carousel showArrows={true} showStatus={false} showThumbs={false} infiniteLoop={true}>
        <div>
          <img src={img1} alt="Slide 1" />
          <div className="legend">
            <span>GET SNAPED</span>
            <p>
              
            </p>
            <Button title="Contact Us" />
          </div>
        </div>
        <div>
          <img src={img2} alt="Slide 2" />
          <div className="legend">
            <span>GET SNAPED</span>
              <p>
                
              </p>
            <Button title="Contact Us" />
          </div>
        </div>
        <div>
          <img src={img3} alt="Slide 3" />
          <div className="legend">
            <span>GET SNAPED</span>
              <p>
                
              </p>
              <Button title="Contact Us" />
            </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
