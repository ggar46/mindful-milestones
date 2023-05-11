import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'
import TasksForm from '../task_components/TasksForm';

const CardGoal = ({eachGoal, toUpdateGoalForm, toDelete}) => {

    const [showModal, setShowModal] = useState(false);

    const onUpdateGoalForm = (eachGoal) => {
        toUpdateGoalForm(eachGoal)
    }

    const onDelete = (toDeleteGoal) => {
        toDelete(toDeleteGoal)
    }


    const handleClickDiv = () => {
        setShowModal(true);
    }


    return (
        <div>
        <Card onClick={handleShow()} className='card-goal'>
            <Card.Body>
            <Card.Img src={eachGoal.image_fkey}></Card.Img>
            <Card.Title>{eachGoal.goal} {eachGoal.goal_purpose}</Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(eachGoal)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdateGoalForm(eachGoal)}} style={{padding: '0.6em'}}> Edit </Button>
            </Card.Body>
        </Card>
        <TasksForm divVisibility={handleClickDiv}/>
        </div>
    )

}

export default CardGoal;