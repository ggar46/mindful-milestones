import React, {useState, useEffect} from 'react';
import { Button, Form, Modal} from "react-bootstrap"


const TasksForm = ({divVisibility, sendGoal, onCloseClick, onNumbers}) => {
    
    const handleCloseClick = () => {
        const boolean = false;
        onCloseClick(boolean);
    }

    //only checked object
    const [checkedArr, setCheckedArr] = useState([]);
    //tasksArray contains the values for each checkbox from database, updated onSubmit with newest value
    //map through each element, return array saved into a variable should contain only values where element.is_checked === true
    //then take the .length of that and save it to a state
    const [tasksArrayDB, setTasksArrayDB] = useState([]);
    //userTasksToPost is one item that is posted onSubmit
    const [userTasksToPost, setUserTasksToPost] = useState(
        {
         id: "",
         goal_fkey: sendGoal.id,
         task_text: "",
         is_checked: false,
       }
    );

    useEffect(() => {
        const loadTasksFromDb = async () => {
            try{
                fetch(`/api/tasks/${sendGoal.id}`)
                .then((response) => response.json())
                .then((incomingData) => {
                setTasksArrayDB(incomingData);
                });
            } catch (error) {
                console.log(`Error fetching data:${error}`);
            }
        }
        loadTasksFromDb();
    }, []);

    useEffect(() => {
        const completedTasks = tasksArrayDB.filter((task) => task.is_checked);
        onNumbers(completedTasks.length, tasksArrayDB.length);
    }, [tasksArrayDB]);

     const handleAddedTaskValue = (event) => {
        const task_text = event.target.value;
        setUserTasksToPost((tableTaskData) => ({ ...tableTaskData, task_text }));
    };

    const handleCheckChange = (id) => {
        setTasksArrayDB((prevTasks) => {
          return prevTasks.map((eachOne) =>
            eachOne.id === id
              ? { ...eachOne, is_checked: !eachOne.is_checked }
              : eachOne
          );
        });
      
        // Find the updated task by ID
        const updatedTask = tasksArrayDB.find((task) => task.id === id);
      
        // Send a PUT request to update the checkbox state in the database
        fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            is_checked: !updatedTask.is_checked,
            goal_fkey: userTasksToPost.goal_fkey,
            task_text: updatedTask.task_text,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Checkbox state updated in the database:', data);
          })
          .catch((error) => {
            console.log('Error updating checkbox state:', error);
          });
      };
      
      

    //  const handleCheckChange = (event) => {
    //     const is_checked = event.target.checked;
    //     const checkedTask = "here is where the entire object or id will go"
    //     //const value = event.target.value;
    //     if(is_checked) {
    //         setUserTasksToPost((userTasksToPost) => ({...userTasksToPost, is_checked: !userTasksToPost.is_checked}));
    //         setCheckedArr((checkedArr) => [...checkedArr, checkedTask]);
    //     }
    // console.log(userTasksToPost, "each post updated");
    // };

    const onSaveTasks = (newTask) => {
        setTasksArrayDB((tasksArray) => [...tasksArray, newTask]);
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


    //in check event listener, if checked, add to array called checkedArr,
    //onSubmit : for each object task in tasksArray.id === checkedArr.id, send a put request that changes the false to true
    //.then use reducer function to sum up those in_checked in tasksArray out of tasksArray.length

    const clearTaskForm = () => {
        setUserTasksToPost({
                id: "",
                goal_fkey: sendGoal.id,
                task_text: "",
                is_checked: false,
            }
        )
    }

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        if (userTasksToPost.task_text.trim() === '') {
            alert('Please enter a task.');
            return;
          }
        postTask(userTasksToPost);
        clearTaskForm();
        console.log("handleTASKSubmit on add task works")
    };
    
    const handleCheckSubmit = (e) => {
        e.preventDefault();

      
        console.log(userTasksToPost, 'from form should have some be true');
        console.log(tasksArrayDB, 'fetched but updated onSubmit');
        console.log(sendGoal.id, 'goal id');
      };


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
                        <input classname="task-submit"  type="submit" value = "Submit" />
            </Form> 



        <Form className='form-tasks' onSubmit={handleCheckSubmit}>
            {tasksArrayDB.map((eachListItem) => (
                <Form.Check
                key={eachListItem.id}
                type="checkbox"
                checked={eachListItem.is_checked}
                id={`${eachListItem.id}`}
                value={eachListItem.task_text}
                onChange={() => handleCheckChange(eachListItem.id)}
                label={eachListItem.task_text}
             />
             ))}

            <Form.Group className='newTaskButtons'>
                <Button type="submit" variant="primary"> Save Changes </Button>
                <Button variant="secondary" onClick={handleCloseClick}>close</Button> 
            </Form.Group>
        </Form>
        </Modal.Body>
        </Modal>
    </div>
    );
}

export default TasksForm;