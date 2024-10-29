import React, { useState, useEffect } from 'react';
import Heading from '../layout/Heading.jsx';
import ProjectCard from '../layout/ProjectCard.jsx';

const Project = () => {
  const [imageData, setImageData] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    // Fetch image URLs from the specified endpoint
    fetch(`${apiBaseUrl}/api/pictures/imageUrls`)
      
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setImageData(data || []);
      })
      .catch((error) => console.error('Error fetching image URLs:', error));
      
  }, []);

  return (
    <div className="md:min-h-screen flex flex-col items-center gap-5 md:mx-35 mx-5 mt-14">
      
      <Heading title1="Our" title2="Project" />

      <div className="flex flex-wrap justify-center gap-4 mt-6 ">
        {imageData.length > 0 ? (
          imageData.map((item, index) => {
            const { imageUrl, price, downloadUrl } = item;
            console.log(item); // Add this line to log the URL

            return (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ">
                <ProjectCard
                  img={imageUrl}
                  title={`Vision No.${index + 1}`}
                  price={price}
                  downloadUrl={downloadUrl}
                />
              </div>
            );
          })
        ) : null}
      </div>
   </div>


  );
}

export default Project;
