import React, {useState, useEffect} from 'react';
import { Button, Form, Modal} from "react-bootstrap"

const TasksForm = ({divVisibility, sendGoalId, onCloseClick}) => {
    
    const handleCloseClick = () => {
        const boolean = false;
        onCloseClick(boolean);
    }

    const [sum, setSum]  =  useState(0);
    const [checkedState, setCheckedState] = useState(false);
    const [checklistValues, setChecklistValues] = useState([]);
    const [userTaskData, setUserTaskData] = useState(
        {
         id: "",
         goal_fkey: sendGoalId,
         task_text: "",
         is_checked: false,
       }
    );

    //fetch DB data for one user's tasks to map through later
    useEffect(() => {
        fetch(`/api/tasks/${sendGoalId}`)
          .then((response) => response.json())
          .then((incomingData) => {
            setChecklistValues([...checklistValues, incomingData]);
            console.log(incomingData, "incoming data from table on useEffect")
          });
      }, []);

     const handleAddedTaskValue = (event) => {
        const task_text = event.target.value;
        setUserTaskData((tableTaskData) => ({ ...tableTaskData, task_text }));
    };

     const handleCheckChange = (event) => {
        const checked = event.target.checked;
        if(checked) {
            setCheckedState(true);
            const is_checked = true;
            setUserTaskData([...userTaskData, {is_checked}]);
        } else if(!checked) {
            const is_checked = false;
            setUserTaskData([...userTaskData, {is_checked}]);
        } 
    };

    //A function to handle the post request
    const postTask = (newTask) => {
        return fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("From the post ", data);
                //I'm sending data to the List of Tasks (the parent) for updating the list
                //this line just for cleaning the form
            });
    };

    const clearTaskForm = () => {
        setUserTaskData({
                id: "",
                goal_fkey: sendGoalId,
                task_text: "",
                isChecked: false,
            }
        )
    }

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        postTask(userTaskData);
        clearTaskForm();
        console.log("handleTASKSubmit on add task works")
    };
    
    const handleCheckSubmit = (e) => {
        e.preventDefault();
        //keep the checked checked? And the unchecked unchecked? NOT SURE
        //keep count of checked?
        let sumOfChecked = checklistValues.reduce((accumulator, currentItem)  => {
            if(currentItem.is_checked ===  true){
                accumulator += 1;
            }
            return accumulator;
        }, 0);
            console.log("handleCHECKSubmit on add task works")
        setSum(sumOfChecked);
    };

    return(
    <div>
      <Modal show={divVisibility} onHide={handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title> Add a New Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {sendGoalId}
            <p>{`${sum} / ${checklistValues.length}`}</p>
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

            <ul>
                {checklistValues.map((eachListItem) => {
                    return <li key={eachListItem.id}>
                        <Form className='form-tasks' onSubmit={handleCheckSubmit}>
                            <Form.Check
                            key={eachListItem.id}
                            type={'checkbox'}
                            id={`isTaskComplete-${eachListItem.id}`}
                            value={eachListItem.task_text}
                            onChange={handleCheckChange}
                            label={eachListItem.task_text}
                            checked={eachListItem.isChecked}
                            />
                        </Form>
                    </li>
                })}
            </ul>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseClick}>close</Button> 
        </Modal.Footer>
        </Modal>
    </div>
    );
}

export default TasksForm;