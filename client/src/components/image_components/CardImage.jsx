import React from 'react';

const CardImage = ({eachImage}) => {

  const getImage = () => {
    if(eachImage) {
      return eachImage;
    } else {
      return "";
    }
  }


    console.log(getImage, "in card")
    return (
      <div data-testid="taskModal" className="each-image-card">
        {/* <Card className="custom-card"> */}
        <div className="actual-image">
          <img src={getImage()} size="200px" className="custom-card-image"/>
        </div>
      {/* </Card> */}
      </div>
      )
    }



export default CardImage;



