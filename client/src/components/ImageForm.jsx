import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const FormImage = ({
  onSaveImageSendToImageCards,
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
  const [selectedImageUrls, setSelectedImageUrls] = useState(
    {
     image_url: "",
     user_fkey: "",
     alt_text: "",
   }
 );
  const [selectedImageUrls2, setSelectedImageUrls2] = useState(
    {
     image_url: "",
     user_fkey: "",
     alt_text: "",
   }
 );
  const [selectedImageUrls3, setSelectedImageUrls3] = useState(
    {
     image_url: "",
     user_fkey: "",
     alt_text: "",
   }
 );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

  //Call images array so dropdown has alt image options
  useEffect(() => {
    fetch("http://localhost:8080/api/pexels")
      .then((response) => response.json())
      .then((dbData) => {
            // console.log(dbData.photos[0].src.tiny, "this is what one url looks like") //imageFormData[0].url
            // console.log(dbData.photos[0].alt, "this is what one alt looks like") //imageFormData[0].alt

            setArrayOfImages(dbData.photos);
          });
  }, []);


//my way, iteratee through and if person unchecks, then I want it removed
  const handleCheckChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    //changed value to JSON.parse(value) because it was reading as a string even before I added JSON.stringify(eachImage) to form
    // console.log("HEEREE IS THE VALUE", JSON.parse(value), arrayOfImages[0]);
    
    console.log(arrayOfImages[0], "first");
    console.log(arrayOfImages[2], "second");

    console.log(JSON.parse(value).id, "the one current");

    console.log(arrayOfImages[0].id==JSON.parse(value).id, "is this it?");

    if (arrayOfImages[0].id===JSON.parse(value).id && checked) {
        setSelectedImageUrls({
          image_url: JSON.parse(value).url,
          user_fkey: "me",
          alt_text: JSON.parse(value).alt,   
        });
      } else if (arrayOfImages[1].id===JSON.parse(value).id && checked) {
        setSelectedImageUrls2({
          image_url: JSON.parse(value).url,
          user_fkey: "me",
          alt_text: JSON.parse(value).alt,   
        }); 
      } else if (arrayOfImages[2].id===JSON.parse(value).id && checked){
        setSelectedImageUrls3({
            image_url: JSON.parse(value).url,
            user_fkey: "me",
            alt_text: JSON.parse(value).alt,   
          });
      } else {
        console.log("they all were false")
      }
    };

  const clearForm = () => {
    setImageFormData({
        image_url: "",
        user_fkey: "",
        alt_text: "",
    });

    setSelectedImageUrls({
        image_url: "",
        user_fkey: "",
        alt_text: "",
    });
  };


  // *********************************************************************************
  //A function to handle the post request, need to post one at a time instead of array
  const postfromImageForm = (newImageForm) => {
    console.log(newImageForm, "received in post request")
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
        console.log(data, "this is how it's being sent")
        onSaveImageSendToImageCards(data);
        clearForm();
      });
  };


  const postfromImageForm2 = (newImageForm2) => {
    console.log(newImageForm2, "received in post request")
    return fetch("http://localhost:8080/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newImageForm2)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //I'm sending data to the List of Image Cards (the parent) to update list
        console.log(data, "this is how it's being sent")
        onSaveImageSendToImageCards(data);
        clearForm();
      });
  };

  
  const postfromImageForm3 = (newImageForm3) => {
    console.log(newImageForm3, "received in post request")
    return fetch("http://localhost:8080/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newImageForm3)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //I'm sending data to the List of Image Cards (the parent) to update list
        console.log(data, "this is how it's being sent")
        onSaveImageSendToImageCards(data);
        clearForm();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFormData.id) {
      console.log("would have done edit function");
    } else {
    console.log(selectedImageUrls, selectedImageUrls, selectedImageUrls3, "all 3 here")
      postfromImageForm(selectedImageUrls)
      postfromImageForm2(selectedImageUrls)
      postfromImageForm3(selectedImageUrls3)
        .then(() => {
          clearForm;
        });
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
                value={JSON.stringify(eachImage)}
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