import React from 'react'
import { Link } from 'react-scroll'
import Button from '../layout/Button.jsx'
import img from '../assets/don_9.png'
import Heading from '../layout/Heading.jsx'


const About = () => {
  return (
    <div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5  ">
      <div className="w-full md:w-2/4">
      <img src={img} alt="img" />
      </div>
      <div className="w-full md:w-2/4 text-center space-y-2 ">
        <Heading title1="About" title2="Us?" />
        <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo neque maxime totam cumque 
            quisquam tempore corporis consequatur animi quas, 
            sint fugit molestias cum possimus! Esse iusto animi placeat iste quam!
        </p>
        <Link to="contact" spy={true} smooth={true} duration={500}>
            <Button title="Contact Us" />
        </Link>
      </div>
    </div>
  )
}

export default About
