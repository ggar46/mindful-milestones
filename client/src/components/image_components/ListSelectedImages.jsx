import React, { useState, useEffect } from 'react'
import ImageForm from './ImageForm';
import CardImage from './CardImage';
import MyNavBar from '../Navbar'
import { useAuth0 } from "@auth0/auth0-react";



const ListSelectedImages = () => {
    const [imageCardArr, setImageCardArr] = useState([]);
    const { user, isAuthenticated } = useAuth0();//user.sub

    const loadImagesFromDB = () => {
        if (isAuthenticated) {
          fetch(`/api/images/${user.sub}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error: " + response.status);
              }
              return response.json();
            })
            .then((imagesFromDB) => {
              setImageCardArr(imagesFromDB);
            })
            .catch((error) => {
              console.error("An error occurred:", error.message);
            });
        }
      };
    
      useEffect(() => {
        loadImagesFromDB();
      }, [isAuthenticated, user]);

    const onSaveImageSendToImageCards = (newImage) => {
        setImageCardArr((imageCardArr) => [...imageCardArr, newImage]);
    }

    return (
        <div>
            <MyNavBar />
            <h2 className="imagesTitle"> Vision Board </h2>
            <ImageForm onSaveImageSendToImageCards={onSaveImageSendToImageCards}/>
            <div className="image-card-container">
                    {imageCardArr.map((eachImage, index) => {
                        return <CardImage key={index} eachImage={eachImage.image_url}/>   
                    })}
            </div>
        </div>
    );
}


export default ListSelectedImages