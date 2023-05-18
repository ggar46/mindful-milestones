import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import ImageForm from './ImageForm';
import CardImage from './CardImage';
import { useAuth0 } from "@auth0/auth0-react";


const ListSelectedImages = () => {

    // this is my original state with an array of students 
    const [imageCardArr, setImageCardArr] = useState([]);
    const { isAuthenticated, user } = useAuth0();

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
      
        <div className="list-selected-images">
            <h2> Images </h2>
            <ImageForm onSaveImageSendToImageCards={onSaveImageSendToImageCards}/>
            <div>
                {imageCardArr.map((eachImage) => {
                    return <div>
                        <CardImage key={eachImage.image_url} eachImage={eachImage.image_url}/>   
                        </div>  
                })}
            </div>
          
        </div>
        

     
        </div>
    );
}


export default ListSelectedImages