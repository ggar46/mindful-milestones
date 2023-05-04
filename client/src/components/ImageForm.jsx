import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const FormImage = ({
  onSaveGoalSendToGoalCards: onSaveImageSendToImageCards,
}) => {
  // This is the original State with not initial student
  const [imageFormData, setImageFormData] = useState(
     {
      image_url: "",
      user_fkey: "",
      alt_text: "",
    }
  );

  const [arrayOfImages, setArrayOfImages] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

  //Call images array so dropdown has alt image options
  useEffect(() => {
    fetch("http://localhost:8080/api/pexels")
      .then((response) => response.json())
      .then((dbData) => {
            console.log(dbData.photos[0].src.tiny, "this is what one url looks like") //imageFormData[0].url
            console.log(dbData.photos[0].alt, "this is what one alt looks like") //imageFormData[0].alt

            setArrayOfImages(dbData.photos);
          });
  }, []);

  //create functions that handle the event of the user typing into the form
  const handleCheckChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setSelectedImageUrls([...selectedImageUrls, value]);
    } else {
      setSelectedImageUrls(selectedImageUrls.filter((url) => url !== value));
    }
  };

  const clearForm = () => {
    setImageFormData({
        image_url: "",
        user_fkey: "",
        alt_text: "",
    });
  };


  // *********************************************************************************
  //A function to handle the post request
  const postfromImageForm = (newImageForm) => {
    console.log("image form post req reached", newImageForm);
    return fetch("http://localhost:8080/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newImageForm)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //I'm sending data to the List of Image Cards (the parent) to update list

        onSaveImageSendToImageCards(data);
        clearForm();
      });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    //loadArrayOfImagesDB();
    if (imageFormData.id) {
    console.log("would have done edit function")
    } else {
      postfromImageForm(selectedImageUrls);
    }
  };
// *********************************************************************************
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add new Image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add an Image to Your Board </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form className="form-students" onSubmit={handleSubmit}>
            <Form.Label> Select image/images </Form.Label>
            {arrayOfImages.map((eachImage) => (
                <Form.Check
                key={eachImage.src.tiny}
                type="checkbox"
                id={`checkbox-${eachImage.src.tiny}`}
                label={<img src={eachImage.src.tiny} alt={`Image ${eachImage.alt}`} />}
                value={eachImage}
                onChange={handleCheckChange}
             />
             ))}

            <Form.Group>
                <Button type="submit" variant="primary"> Add Student </Button>
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormImage;