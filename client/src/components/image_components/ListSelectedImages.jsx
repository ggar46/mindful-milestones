import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import ImageForm from './ImageForm';
import CardImage from './CardImage';


const ListSelectedImages = () => {

    // this is my original state with an array of students 
    const [imageCardArr, setImageCardArr] = useState([]);


    const loadImagesFromDB = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("/api/images")
            .then((response) => response.json())
            .then((imagesFromDB) => {
                setImageCardArr(imagesFromDB);
            });
    }

    useEffect(() => {
        loadImagesFromDB();
    }, []);

    const onSaveImageSendToImageCards = (newImage) => {
        //console.log(newStudent, "From the parent - List of Students");
        //console.log(newImage, "from listImageeFunction")
        setImageCardArr((imageCardArr) => [...imageCardArr, newImage]);
        console.log(imageCardArr, "send this (ARRAY WITH 2 INSTEAD OF ONNE OBJECT")
    }

    return (
        <div className="mybody">
        <div className="list-images">
            <h2> Images </h2>
            <ImageForm onSaveImageSendToImageCards={onSaveImageSendToImageCards}/>
            <ul>
                {imageCardArr.map((eachImage) => {
                    return <li key={eachImage.image_url}>  
                        <CardImage eachImage={eachImage.image_url}/>   
                    </li>
                })}
            </ul>
          
        </div>
        
        </div>
    );
}


export default ListSelectedImages