import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const FormGoal = ({
  onSaveGoalSendToGoalCards,
  editingGoalFormData,
  onUpdateGoalForm,
}) => {
  // This is the original State with not initial student
  const [goalFormData, setGoalFormData] = useState(
    editingGoalFormData || {
      goal: "",
      date: "",
      goal_purpose: "",
      goal_obstacle: "",
      strategy: "",
      image_fkey: ""
    }
  );

  const [arrayOfImages, setArrayOfImages] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  



  //Call images array so dropdown has alt image options
  useEffect(() => {
    fetch("/api/images")
      .then((response) => response.json())
      .then((dbData) => {
            setArrayOfImages(dbData);
          });
  }, []);

  //create functions that handle the event of the user typing into the form
  const handleGoalChange = (event) => {
    const goal = event.target.value;
    setGoalFormData((goalFormData) => ({ ...goalFormData, goal }));
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setGoalFormData((goalFormData) => ({ ...goalFormData, date }));
  };

  const handleGoalPurpose = (event) => {
    const goal_purpose = event.target.value;
    setGoalFormData((goalFormData) => ({ ...goalFormData, goal_purpose }));
  };

  const handleGoalObstacle = (event) => {
    const goal_obstacle = event.target.value;
    setGoalFormData((goalFormData) => ({ ...goalFormData, goal_obstacle }));
  };

  const handleStrategy = (event) => {
    const strategy = event.target.value;
    setGoalFormData((goalFormData) => ({ ...goalFormData, strategy }));
  };

  const handleImageDropdown = (event) => {
    const image_fkey = event.target.value;
    setGoalFormData((student) => ({ ...student, image_fkey }));
  };

  const clearForm = () => {
    setGoalFormData({
      goal: "",
      date: "",
      goal_purpose: "",
      goal_obstacle: "",
      strategy: "",
      image_fkey: ""
    });
  };


  // *********************************************************************************
  //A function to handle the post request
  const postGoalForm = (newUserForm) => {
    return fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserForm)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log("From the post ", data);
        //I'm sending data to the List of Students (the parent) for updating the list
        onSaveGoalSendToGoalCards(data);
        //this line just for cleaning the form
        clearForm();
      });
  };

  //A function to handle the put request
  const putReqGoalForm = (toEditGoalInfo) => {
    handleShow;
    console.log('working')
    console.log("from put req goal", toEditGoalInfo)
    return fetch(`/api/goals/${toEditGoalInfo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditGoalInfo)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateGoalForm(data);
        //this line just for cleaning the form
        clearForm();
      });
  };
  // *********************************************************************************
  //A function to handle the submit in both cases - Post and Put request!
  const handleSubmit = (e) => {
    e.preventDefault();
    //loadArrayOfImagesDB();
    if (goalFormData.id) {
    console.log("reached if statement")
      putReqGoalForm(goalFormData);
    } else {
      postGoalForm(goalFormData);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> New Goal Form </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-students" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Goal</Form.Label>
              <input
                type="text"
                id="add-goal"
                placeholder="Goal"
                required
                value={goalFormData.goal}
                onChange={handleGoalChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <input
                type="date"
                id="add-date"
                placeholder="Date"
                required
                value={goalFormData.date}
                onChange={handleDateChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Goal Purpose</Form.Label>
              <input
                type="text"
                id="add-goal-purpose"
                placeholder="Goal Purpose"
                required
                value={goalFormData.goal_purpose}
                onChange={handleGoalPurpose}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Goal Obstacles</Form.Label>
              <input
                type="text"
                id="add-goal-obstacle"
                placeholder="Goal Obstacle"
                required
                value={goalFormData.goal_obstacle}
                onChange={handleGoalObstacle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Goal Strategy</Form.Label>
              <input
                type="text"
                id="add-goal-strategy"
                placeholder="Goal Strategy"
                required
                value={goalFormData.goal_strategy}
                onChange={handleStrategy}
              />
            </Form.Group>
            {/* ********************************************************************************* */}
            <Form.Group>
              <Form.Label>Select Image</Form.Label>
              <select onChange={handleImageDropdown}>
                <option>Please choose an image by its description</option>
                {arrayOfImages.map((oneImage) => {
                  return (
                    <option id={oneImage.image_url} value={oneImage.image_url}>
                      {" "}
                      {oneImage.alt_text}{" "}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
            {/* ********************************************************************************* */}
            <Form.Group>
              <Button type="submit" variant="outline-success">
                {goalFormData.id ? "Edit Student" : "Add Student"}
              </Button>
              {goalFormData.id ? (
                <Button
                  type="button"
                  variant="outline-warning"
                  onClick={clearForm}
                >
                  Cancel
                </Button>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormGoal;