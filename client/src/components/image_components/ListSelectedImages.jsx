import React, { useState, useEffect } from 'react'
import ImageForm from './ImageForm';
import CardImage from './CardImage';
import MyNavBar from '../Navbar'
import { useAuth0 } from "@auth0/auth0-react";



const ListSelectedImages = () => {
    const [imageCardArr, setImageCardArr] = useState([]);
    const { user, isAuthenticated } = useAuth0();//user.sub
    // const setUser = () => {
    //     if(user){
    //       const currentUser = user.sub;
    //       return currentUser;
    //     } else {
    //       console.log("fail");
    //     }
    //   }


    //add usersub
    // const loadImagesFromDB = () => {
    //     // A function to fetch the list of students that will be load anytime that list change
    //     fetch(`/api/images`)
    //         .then((response) => response.json())
    //         .then((imagesFromDB) => {
    //             setImageCardArr(imagesFromDB);
    //         });
    // }


 
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
        //console.log(newStudent, "From the parent - List of Students");
        //console.log(newImage, "from listImageeFunction")
        setImageCardArr((imageCardArr) => [...imageCardArr, newImage]);
    }

    return (
        <div>
            <MyNavBar />
            <h2 className="imagesTitle"> Vision Board </h2>
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