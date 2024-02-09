import React from 'react'
import Heading from '../layout/Heading.jsx'
import ReviewCard from '../layout/ReviewCard.jsx'
import img1 from '../assets/lon_1.png'
import img2 from '../assets/lon_2.png'
import img3 from '../assets/lon_3.png'

const Review = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-content md-px-32 px-5 mt-5">
      <Heading title1="Our" title2="Reviews" />

      <div className="flex flex_Col md:flex-row gap-5 mt-5">
        <ReviewCard img={img1}/>
        <ReviewCard img={img2}/>
        <ReviewCard img={img3}/>
      </div>
    </div>
  )
}

export default Review
