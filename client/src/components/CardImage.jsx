import React from 'react';
import Card from 'react-bootstrap/Card';




const CardImage = ({eachImage}) => {

    console.log(eachImage, "in card")
    return (
        <Card>
            <Card.Body>
            <Card.Img src={eachImage}></Card.Img>
            </Card.Body>
        </Card>
    )

}

export default CardImage;