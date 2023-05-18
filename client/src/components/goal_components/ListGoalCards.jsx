import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import FormGoal from './FormGoal';
import CardGoal from './CardGoal';
import MyNavBar from '../Navbar';
import { Grid } from 'semantic-ui-react';

const ListGoalCards = () => {

    // this is my original state with an array of students 
    const [goalCardArr, setGoalCardArr] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingGoalFormData, setEditingGoal] = useState(null)

    const [setShowModal, showModalData] = useState(false);

    const loadGoalsFromDB = () => {
        // A function to fetch the list of students that will be load anytime that list change
            fetch("/api/goals")
            .then((response) => response.json())
            .then((goalsFromDB) => {
                setGoalCardArr(goalsFromDB);
            });

  
    }

    useEffect(() => {
        loadGoalsFromDB();
    }, []);

    const onSaveGoalSendToGoalCards = (newGoal) => {
        //console.log(newStudent, "From the parent - List of Students");
        setGoalCardArr((goalCardArr) => [...goalCardArr, newGoal]);
    }


    //A function to control the update in the parent (student component)
    const updateGoalForm = (eachGoal) => {
        // console.log("Line 29 savedStudent", savedStudent);
        // This function should update the whole list of students - 
        loadGoalsFromDB();
    }

    //A function to handle the Delete funtionality
    const onDelete = (toDeleteGoal) => {
        //console.log(student, "delete method")
        return fetch(`/api/goals/${toDeleteGoal.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadGoalsFromDB();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdateGoalForm = (eachGoal) => {
        setEditingGoal(eachGoal);
    }



    return (
        <div>

        <div className="mygoalbody" >

            <FormGoal key={editingGoalFormData ? editingGoalFormData.id : null} setShowModal={setShowModal} onSaveGoalSendToGoalCards={onSaveGoalSendToGoalCards} editingGoalFormData={editingGoalFormData} onUpdateGoalForm={onUpdateGoalForm} />
        <div className="list-goal-cards">
        <div className="goal-card-container">
            <Grid columns={3} divided textAlign='center' centered verticalAlign='middle'>
                {goalCardArr.map((eachGoal) => {
                    return <CardGoal className="goal-cards" key={eachGoal.id} eachGoal={eachGoal} toDelete={onDelete} toUpdateGoalForm={onUpdateGoalForm} />
                })}
            </Grid>
        </div>
        </div>   
        </div>
        </div>
    );
}


export default ListGoalCards