import React, { useState } from 'react';
import Checkout from '../components/checkout'; // Import the Checkout component

const ProjectCard = ({ img, title, price, downloadUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isValidUrl = typeof img === 'string' && img.trim() !== '';

  return (
    <div>
      <div className="flex flex-col items-center justify-between bg-white border-2 border-lightText md:border-none md:w-2/5 p-5 cursor-pointer rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_0px] transition-all">
        <div className="w-3/3">
          {isValidUrl ? (
            <img src={img} alt={title} className="w-full rounded-lg" />
          ) : (
            <div className="w-full rounded-lg bg-gray-300">Image not available</div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-center my-5">{title}</h3>
          <p className="text-lightText text-center md:text-start">Price: ₵{price}</p>
          <button onClick={openModal} className="bg-green-500 text-white p-2 rounded-lg w-full">
            Checkout
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6  rounded-lg">
            <button onClick={closeModal} className="float-right text-red-600">Close</button>
            <Checkout img={img} title={title} price={price} downloadUrl={downloadUrl}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
