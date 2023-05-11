import React, {useState, useEffect} from 'react';
import { Button, Form, Modal} from "react-bootstrap"

const TasksForm = ({divVisibility, sendGoalId}) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); 

    const [checkedState, setCheckedState] = useState(false);
    const [arrTasksForCheckboxes, setArrTasksForCheckboxes] = useState([]); //iterate and create checkboxes
    const [checkedTaskArray, setCheckedTaskArray] = useState([]);
    //get info from DB to map through tasks to load in page, maybe load in other component
    const [tableTaskData, setTableTaskData] = useState(
        {
         id: "",
         goal_fkey: sendGoalId,
         task_text: "",
         isChecked: false,
       }
     );


    //fetch DB data for one user's tasks to map through later
    useEffect(() => {
        fetch(`/api/tasks/${sendGoalId}`)
          .then((response) => response.json())
          .then((incomingData) => {
            setArrTasksForCheckboxes(incomingData);
          });
      }, []);

     const handleAddedTaskValue = (event) => {
        const task_text = event.target.value;
        setTableTaskData((tableTaskData) => ({ ...tableTaskData, task_text }));
    };

     const handleCheckChange = (event) => {
        setCheckedState(!checkedState);
        const is_checked = event.target.checked;
        const value = e.target.value;
        if(checked) {
            setCheckedTaskArray((tableTaskData) => ({ ...checkedTaskArray, is_checked }));
        } else {
            setCheckedTaskArray(
                checkedTaskArray.filter(
                    (checkedFinishedTask) => checkedFinishedTask.task_text !== task_text
                )
            )
        }
        
    };

    

    //A function to handle the post request
    // const postStudent = (newStudent) => {
    //     return fetch("http://localhost:8080/api/students", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newStudent),
    //     })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             //console.log("From the post ", data);
    //             //I'm sending data to the List of Students (the parent) for updating the list
    //             onSaveStudent(data);
    //             //this line just for cleaning the form
    //             clearForm();
    //         });
    // };

    //A function to handle the submit in both cases - Post and Put request!
    
    const handleTaskSubmit = (e) => {
        e.preventDefault();
            //postStudent(student);
            console.log("handleTASKSubmit on add task works")
    };
    
    const handleCheckSubmit = (e) => {
        e.preventDefault();
            //postStudent(student);
            console.log("handleCHECKSubmit on add task works")
    };

    return(
    <div>
      {/* <Button variant="primary" onClick={divVisibility}>
        Add new Task
      </Button> */}

      <Modal show={divVisibility} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add a New Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <ul>
                {arrTasksForCheckboxes.map((eachListItem) => {
                    return <li key={eachListItem.id}>
                    <Form className="add-task" onSubmit={handleTaskSubmit}>
                        <Form.Label> Create Tasks </Form.Label>
                        <input
                            id="add-a-task"
                            type="text"
                            placeholder="To-Do Items"
                            name="task"
                            onChange={handleAddedTaskValue}
                        />
                        <input type="submit" value = "Submit" />
                    </Form> 
                    </li>
                })}
            </ul>

        <Form className='form-tasks' onSubmit={handleCheckSubmit}>
            <Form.Check
            key={tableTaskData.taskid}
            type={'checkbox'}
            id={`isTaskComplete`}
            value={checkedState}
            onChange={handleCheckChange}
            label={tableTaskData.task_text}
            />
            <Form.Group>
            <Button type="submit" variant="outline-success">Submit</Button>
            </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>close</Button> 
        </Modal.Footer>
        </Modal>
    </div>
    );
}

export default TasksForm;