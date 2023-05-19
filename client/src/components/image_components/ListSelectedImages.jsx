import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import ImageForm from './ImageForm';
import CardImage from './CardImage';
import { useAuth0 } from "@auth0/auth0-react";



const ListSelectedImages = () => {
    // this is my original state with an array of students 
    const [imageCardArr, setImageCardArr] = useState([]);
    const { user } = useAuth0();//user.sub
    const setUser = () => {
        if(user){
          const currentUser = user.sub;
          return currentUser;
        } else {
          console.log("fail");
        }
      }


    //add usersub
    const loadImagesFromDB = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch(`/api/images/${setUser}`)
            .then((response) => response.json())
            .then((imagesFromDB) => {
                setImageCardArr(imagesFromDB);
            });
    }


    //no need to add usersub, should already have it
    useEffect(() => {
        loadImagesFromDB();
    }, []);

    const onSaveImageSendToImageCards = (newImage) => {
        //console.log(newStudent, "From the parent - List of Students");
        //console.log(newImage, "from listImageeFunction")
        setImageCardArr((imageCardArr) => [...imageCardArr, newImage]);
    }

    return (
        <div>
            <ImageForm onSaveImageSendToImageCards={onSaveImageSendToImageCards}/>
            <div className="image-card-container">
                    {imageCardArr.map((eachImage) => {
                        return <CardImage eachImage={eachImage.image_url}/>   
                    })}
            </div>
        </div>
    );
}


export default ListSelectedImages