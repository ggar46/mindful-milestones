import React from 'react';
import Card from 'react-bootstrap/Card';

const CardImage = ({eachImage}) => {

    console.log(eachImage, "in card")
    return (
      <div className="each-image-card">
        {/* <Card className="custom-card"> */}
        <div className="actual-image">
          <img src={eachImage} size="200px" className="custom-card-image"/>
        </div>
      {/* </Card> */}
      </div>
      )
    }



export default CardImage;



