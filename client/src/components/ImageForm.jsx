import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const FormImage = ({onSaveImageSendToImageCards}) => {

  const [imageFormData, setImageFormData] = useState(
     {
      image_url: "",
      user_fkey: "user",
      alt_text: "",
    }
  );

  const [arrayOfImages, setArrayOfImages] = useState([]); //from API directly, will use for search
  const [show, setShow] = useState(false);
  const [checkedImages, setCheckedImages] = useState([]);
  //--------------------------------------------------------------------------------------------------------
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  

  //Call images array so dropdown has alt image options
//   useEffect(() => {
//     fetch("http://localhost:8080/api/pexels")
//       .then((response) => response.json())
//       .then((dbData) => {
//             // console.log(dbData.photos[0].src.tiny, "this is what one url looks like") //imageFormData[0].url
//             // console.log(dbData.photos[0].alt, "this is what one alt looks like") //imageFormData[0].alt

//             setArrayOfImages(dbData.photos);
//           });
//   }, []);


useEffect(() => {
  }, [imageFormData]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pexels")
      .then((response) => response.json())
      .then((dbData) => {
        setArrayOfImages(dbData.photos);
      });
  }, []);


//my way, iteratee through and if person unchecks, then I want it removed
const handleCheckChange = (e) => {

    const checked = e.target.checked;
    const value = e.target.value;
    const image_url = JSON.parse(value).src.small;
    const alt_text = JSON.parse(value).alt;
    const user_fkey  = "user";

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

  const clearForm = () => {
    setImageFormData({
        image_url: "",
        user_fkey: "user",
        alt_text: "",
    });
  };


  // *********************************************************************************
  //A function to handle the post request, need to post one at a time instead of array
  const postfromImageForm = (newImageForm) => {
    //console.log(newImageForm, "should have correct url")
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
        console.log(data, "should be object in array")
        onSaveImageSendToImageCards(data);
        clearForm();
      });
  };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (imageFormData.id) {
//       console.log("would have done edit function");
//     } else {
//     console.log(imageFormData, "all image form data onNSUbmit")
//       postfromImageForm(imageFormData)
//         .then(() => {
//           clearForm();
//         });
//     }
//   };


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


// // *********************************************************************************
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
                label={<img src={eachImage.src.tiny} alt={`${eachImage.alt}`} />}
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