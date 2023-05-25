import React, {useState, useEffect} from 'react';
import { Button, Form, Modal} from "react-bootstrap"
import { IoClose } from 'react-icons/io5';

const TasksForm = ({divVisibility, sendGoal, onCloseClick, onNumbers}) => {
    
    const handleCloseClick = () => {
        const boolean = false;
        onCloseClick(boolean);
    }

    const getGoalProperty = (propertyName) => {
        if (sendGoal) {
          return sendGoal[propertyName] || '';
        } else {
          console.log('you got it');
          return '';
        }
      };
    
      const eachGoalId = getGoalProperty('id');
      const eachGoalName = getGoalProperty('goal');
      const eachGoalDate = getGoalProperty('date')?.slice(0, 10);
      const eachGoalImage = getGoalProperty('image_fkey');
      const eachGoalPurpose = getGoalProperty('goal_purpose');
      const eachGoalObstacle = getGoalProperty('goal_obstacle');
      const eachGoalStrategy = getGoalProperty('strategy');
    
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
         goal_fkey: eachGoalId,
         task_text: "",
         is_checked: false,
       }
    );

    const loadTasksFromDb = async () => {
      try {
        const response = await fetch(`/api/tasks/${sendGoal.id}`);
        const incomingData = await response.json();
        setTasksArrayDB(incomingData);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    };
    
    useEffect(() => {
      if (sendGoal) {
        loadTasksFromDb();
      }
    }, [sendGoal]);
    
  
    useEffect(() => {
        try{
            const completedTasks = tasksArrayDB.filter((task) => task.is_checked);
            onNumbers(completedTasks.length, tasksArrayDB.length);
        } catch (error) {
            console.log(`Error fetching data:${error}`);
        }
 
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
            goal_fkey: eachGoalId,
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
            });
    };

    const onDelete = (taskId) => {
      console.log(taskId, "deleted task")
      return fetch(`/api/tasks/${taskId}`, {
          method: "DELETE"
      }).then((response) => {
          //console.log(response);
          if (response.ok) {
            loadTasksFromDb();
          }
      })
  }

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
    };
    
    const handleCheckSubmit = (e) => {
        e.preventDefault();

      
        console.log(userTasksToPost, 'from form should have some be true');
        console.log(tasksArrayDB, 'fetched but updated onSubmit');
        console.log(sendGoal.id, 'goal id');
      };


    return (
    <div data-testid="taskModal">
      <Modal show={divVisibility} onHide={handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title  id="modal-goal-title"> {eachGoalName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div id="goal-info-modal-body">
                <span>Goal Date : {eachGoalDate}</span> 
                <img id="img-inside-modal" src={eachGoalImage}/>
                <p><span> Purpose :   </span> {eachGoalPurpose} </p>
                <p><span> Possible Obstacles :   </span>{eachGoalObstacle}</p>
                <p><span> Strategy :   </span>{eachGoalStrategy}</p>
            </div>
            <Form className="add-task" onSubmit={handleTaskSubmit}>
                        <Form.Label> <h4>Create Tasks</h4> </Form.Label>
                        <input
                            id="add-a-task"
                            type="text"
                            placeholder="To-Do Items"
                            name="task"
                            onChange={handleAddedTaskValue}
                        />
                        <input className="task-submit"  type="submit" value = "Submit" />
            </Form> 

            <Form className='form-tasks' onSubmit={handleCheckSubmit}>
            {tasksArrayDB.map((eachListItem) => (
              <div key={eachListItem.id} className="task-item">
                <Form.Check
                  type="checkbox"
                  className="checkbox-item"
                  checked={eachListItem.is_checked}
                  id={`${eachListItem.id}`}
                  value={eachListItem.task_text}
                  onChange={() => handleCheckChange(eachListItem.id)}
                  label={eachListItem.task_text}
                />
                <Button
                  id="tinybutton" 
                  className="delete-task-button"
                  onClick={() => onDelete(eachListItem.id)}
                >
                  <IoClose />
                </Button>
              </div>
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