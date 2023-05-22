import React, { useState, useEffect } from 'react'
import FormGoal from './FormGoal';
import CardGoal from './CardGoal';
// import MyNavBar from '../Navbar';
import { Grid } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";
import MyNavBar from "../Navbar";


const ListGoalCards = () => {

    const { user, isAuthenticated } = useAuth0();//user.sub
    // this is my original state with an array of students 
    const [goalCardArr, setGoalCardArr] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingGoalFormData, setEditingGoal] = useState(null)

    const [setShowModal, showModalData] = useState(false);

    const loadGoalsFromDB = () => {
        // A function to fetch the list of goals that will be load anytime that list change
        if(isAuthenticated){
            try{
                fetch(`/api/goals/${user.sub}`)
                .then((response) => response.json())
                .then((goalsFromDB) => {
                    setGoalCardArr(goalsFromDB);
                });
            } catch {
                console.log("api fetch did not work");
            }
        } else {
            console.log("load goals function in list is not working")
        }

    }

    useEffect(() => {
            loadGoalsFromDB();
    }, [isAuthenticated, user]);


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
        <div >
        <MyNavBar/>
        <h2 className="goals-title"> Goals </h2>
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