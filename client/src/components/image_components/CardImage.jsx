import React from 'react';
import Card from 'react-bootstrap/Card';

const CardImage = ({eachImage}) => {

    console.log(eachImage, "in card")
    return (
        <Card className="custom-card">
        <Card.Img src={eachImage} className="custom-card-image"></Card.Img>
      </Card>
      )
    }



export default CardImage;



