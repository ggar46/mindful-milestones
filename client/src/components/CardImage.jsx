import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'



const CardImage = ({eachImage}) => {

    console.log(eachImage, "in card")
    return (
        <Card>
            <Card.Body>
            <Card.Img src={eachImage}/>
            </Card.Body>
        </Card>
    )

}

export default CardImage;