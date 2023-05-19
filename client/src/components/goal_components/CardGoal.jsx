import React from 'react';
import { useState } from 'react';
import * as ioicons from 'react-icons/io5'
import TasksForm from '../task_components/TasksForm';
import { Grid, Image, Header, Button} from 'semantic-ui-react';

const CardGoal = ({eachGoal, toUpdateGoalForm, toDelete}) => {

    const [showModal, setShowModal] = useState(false);
    //const handleShowModal = () => setShowModal(true); 
    const [countOfChecked, setCountOfChecked] = useState(0);
    const [total, setTotal] = useState(0);

    const onDelete = (toDeleteGoal) => {
        toDelete(toDeleteGoal)
    }


//result needs to reach modal in show={show}
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleCheckedCount = (countOfChecked, total) => {
        setCountOfChecked(countOfChecked);
        setTotal(total);
    }

    return (
        <Grid.Row stretched className="bordered">
            <Grid.Column>
                <Image src={eachGoal.image_fkey}/>
            </Grid.Column>
            <Grid.Column>
                <Header>{eachGoal.goal}</Header>
                <p>{eachGoal.date.slice(0,10)} </p>
                <p> {countOfChecked}/{total} tasks completed</p>
            </Grid.Column>
            <Grid.Column>
                <div>
                <Button id="trash" onClick={()=>{onDelete(eachGoal)}} size="small"><ioicons.IoTrash/></Button>
                <Button onClick={handleShowModal} size="small"> Goal Info </Button>
                <TasksForm onNumbers={handleCheckedCount} divVisibility={showModal} onCloseClick={handleCloseModal} sendGoalId={eachGoal.id}/>
                </div>
            </Grid.Column>
        </Grid.Row>
    )
}

export default CardGoal;