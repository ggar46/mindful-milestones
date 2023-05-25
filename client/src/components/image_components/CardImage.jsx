import React from 'react';
import { IoClose } from 'react-icons/io5';

const CardImage = ({ toDelete, eachImage }) => {
  const getImage = () => {
    if (eachImage) {
      return eachImage;
    } else {
      return "";
    }
  }

  const onDelete = () => {
    const encodedImage = encodeURIComponent(eachImage);
    toDelete(encodedImage);
  }

  return (
    <div data-testid="taskModal" className="each-image-card">
      <button id="tinyImageButton" className="close-button" onClick={() => onDelete()}>
        <IoClose />
      </button>
      <div className="actual-image">
        <img src={getImage()} size="200px" className="custom-card-image" />
      </div>
    </div>
  );
}

export default CardImage;



