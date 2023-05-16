import React, {useState, useEffect} from 'react';
import { Button, Form, Modal} from "react-bootstrap"


const TasksForm = ({divVisibility, sendGoalId, onCloseClick}) => {
    
    const handleCloseClick = () => {
        const boolean = false;
        onCloseClick(boolean);
    }

    //only checked object, to use for count?? How to count?
    const [checkedArr, setCheckedArr] = useState([]);
    //tasksArray contains the values for each checkbox, updated onSubmit with newest value
    const [tasksArray, setTasksArray] = useState([]);
    //userTasksToPost is one item that is posted onSubmit
    const [userTasksToPost, setUserTasksToPost] = useState(
        {
         id: "",
         goal_fkey: sendGoalId,
         task_text: "",
         is_checked: false,
       }
    );


    const loadTasksFromDb = () => {
        fetch(`/api/tasks/${sendGoalId}`)
          .then((response) => response.json())
          .then((incomingData) => {
            setTasksArray(incomingData);
          });
    }


    //fetch DB data for one user's tasks to map through later
    useEffect(() => {
        loadTasksFromDb();
      }, []);

     const handleAddedTaskValue = (event) => {
        const task_text = event.target.value;
        setUserTasksToPost((tableTaskData) => ({ ...tableTaskData, task_text }));
    };

     const handleCheckChange = (event) => {
        const is_checked = event.target.checked;
        const checkedTask = "here is where the entire object or id will go"
        //const value = event.target.value;
        if(is_checked) {
            setUserTasksToPost((userTasksToPost) => ({...userTasksToPost, is_checked: !userTasksToPost.is_checked}));
            setCheckedArr((checkedArr) => [...checkedArr, checkedTask]);
        }
    console.log(userTasksToPost, "each post updated");
    };

    const onSaveTasks = (newTask) => {
        setTasksArray((tasksArray) => [...tasksArray, newTask]);
    }

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
                onSaveTasks(data)
                //I'm sending data to the List of Tasks (the parent) for updating the list
                //this line just for cleaning the form
            });
    };


    //argument would be the object
    const putTask = (toEditStudent) => {
        return fetch(`http://localhost:8080/api/students/${toEditStudent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditStudent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateStudent(data);
                //this line just for cleaning the form
                clearForm();
            });
    };



    const clearTaskForm = () => {
        setUserTasksToPost({
                id: "",
                goal_fkey: sendGoalId,
                task_text: "",
                is_checked: false,
            }
        )
    }

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        postTask(userTasksToPost);
        clearTaskForm();
        console.log("handleTASKSubmit on add task works")
    };
    
    const handleCheckSubmit = (e) => {
        e.preventDefault();
    //in check event listener, if checked, add to array called checkedArr,
    //onSubmit : for each object task in tasksArray.id === checkedArr.id, send a put request that changes the false to true
        if(tasksArray.id === checkedArr.id){
            putTask();
        }


        console.log(userTasksToPost, "from form should have some be true");
        console.log(tasksArray, "fetched but updated onSubmit");


    }


    return (
    <div>
      <Modal show={divVisibility} onHide={handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title> Add a New Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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



        <Form className='form-tasks' onSubmit={handleCheckSubmit}>
            {tasksArray.map((eachListItem) => (
                <Form.Check
                key={eachListItem.id}
                type="checkbox"
                id={`${eachListItem.id}`}
                value={eachListItem.task_text}
                onChange={handleCheckChange}
                label={eachListItem.task_text}
             />
             ))}
                <input type="submit" value = "Save Changes" />
            {/* <Form.Group>
                <Button type="submit" variant="primary"> Save Changes </Button>
            </Form.Group> */}
        </Form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseClick}>close</Button> 
        </Modal.Footer>
        </Modal>
    </div>
    );
}

export default TasksForm;