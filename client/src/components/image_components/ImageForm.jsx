import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const FormImage = ({onSaveImageSendToImageCards}) => {

  const { user } = useAuth0(); //user.sub
  const currentUser = user ? user.sub :  "";
  const [imageFormData, setImageFormData] = useState(
     {
      image_url: "",
      user_fkey: currentUser,
      alt_text: "",
    }
  );

  const [arrayOfImages, setArrayOfImages] = useState([]); //from API directly, will use for search
  const [show, setShow] = useState(false);
  const [checkedImages, setCheckedImages] = useState([]);
  //uncomment for search
  const [searchedValue, setSearchedValue] = useState([]);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  


  // useEffect(() => {
  //   fetch("/api/pexels")
  //     .then((response) => response.json())
  //     .then((dbData) => {
  //       setArrayOfImages(dbData.photos);
  //     });
  // }, []);

//API fetch request, uncomment for search
const searchByUserInput = (incomingData) => {
  fetch(`/api/pexels/${incomingData}`)
    .then((response) => response.json())
    .then((dbData) => {
      setArrayOfImages(dbData.photos);
    });
}

const handleCheckChange = (currentUser, event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    console.log(value, "hopefully full JSON string 5/18.23")
    const image_url = JSON.parse(value).src.large;
    const alt_text = JSON.parse(value).alt;
    const user_fkey  = currentUser;
    if (checked) {
      setCheckedImages([...checkedImages, { image_url, user_fkey, alt_text }]);

    } else {
      setCheckedImages(
        checkedImages.filter(
          (checkedImage) => checkedImage.image_url !== image_url
        )
      );
    }
  };

//uncomment for search
  const handleSearchedValue = (event) => {
    const value = event.target.value;
    setSearchedValue(value);
   }

  const clearForm = () => {
    setImageFormData({
        image_url: "",
        user_fkey: currentUser,
        alt_text: "",
    });
  };

  //A function to handle the post request, need to post one at a time instead of array
  const postfromImageForm = (newImageForm) => {
    newImageForm.user_fkey = user.sub
    return fetch(`/api/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newImageForm)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //I'm sending data to the List of Image Cards (the parent) to update list
        console.log(data, "should be object in array")
        onSaveImageSendToImageCards(data);
        clearForm();
      });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (checkedImages.length === 0) {
      return;
    }

    checkedImages.forEach((checkedImage) => {
      //console.log(checkedImage, "each object in the state array")
      postfromImageForm(checkedImage);
    });

    setCheckedImages([]);
    handleClose();
    //console.log(checkedImages, "sent to post req., array of objects")
  };


//uncomment for search
const handleSearchSubmit = (e) => {
  e.preventDefault();
  //put searched value into api get request, which will automatically get 3 results
  searchByUserInput(searchedValue);
}

// // *********************************************************************************
  return (
    <div data-testid="taskModal">
      <Button variant="primary" className="newImageButton" onClick={handleShow}>
        Add new Image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add an Image to Your Board </Modal.Title>
        </Modal.Header>
        <Modal.Body>


        {/* uncomment for search */}
        <Form className="form-search" onSubmit={handleSearchSubmit}>
          <Form.Label id="text-in-search-bar"> Search for images using a word or phrase </Form.Label>
          <input
            id="searched-value"
            type="text"
            placeholder="Search Images"
            name="city"
            onChange={handleSearchedValue}
          />
          <input type="submit" value = "Submit" />
        </Form>



        <Form className="form-students" onSubmit={handleSubmit}>
            {arrayOfImages.map((eachImage) => (
                <Form.Check
                key={eachImage.src.tiny}
                type="checkbox"
                id={`checkbox-${eachImage.src.tiny}`}
                value={JSON.stringify(eachImage)}
                onChange={(event) => handleCheckChange(currentUser, event)}
                label={<img src={eachImage.src.tiny} alt={`${eachImage.alt}`} />}
             />
             ))}


          <div className="form-button-container">
            <Form.Group>
                <Button type="submit" variant="primary"> Save Images </Button> 
 
            </Form.Group>
                <Button className="closeForm" variant="secondary" onClick={handleClose}>
                  close
                </Button>
          </div>
  
        </Form>
        </Modal.Body>
  
      </Modal>
    </div>
  );
};

export default FormImage;










