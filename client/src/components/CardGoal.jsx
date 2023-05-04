import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const CardGoal = ({eachGoal, toUpdateGoalForm, toDelete}) => {

    const onUpdateGoalForm = (eachGoal) => {
        toUpdateGoalForm(eachGoal)
    }

    const onDelete = (toDeleteGoal) => {
        toDelete(toDeleteGoal)
    }

    return (
        <Card>
            <Card.Body>
            <Card.Title>{eachGoal.goal} {eachGoal.goal_purpose}</Card.Title>
            <Button variant="outline-danger" onClick={()=>{onDelete(eachGoal)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdateGoalForm(eachGoal)}} style={{padding: '0.6em'}}> Edit </Button>
            </Card.Body>
        </Card>
    )

}

export default CardGoal;