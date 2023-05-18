import React from 'react';
import { useState } from 'react';


import * as ioicons from 'react-icons/io5'
import TasksForm from '../task_components/TasksForm';
import { Grid, Image, Header, Button} from 'semantic-ui-react';

const CardGoal = ({eachGoal, toUpdateGoalForm, toDelete}) => {

    const [showModal, setShowModal] = useState(false);
    //const handleShowModal = () => setShowModal(true); 

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

    return (

        <Grid.Row stretched className="bordered">
            <Grid.Column>
                <Image src={eachGoal.image_fkey}/>
            </Grid.Column>
            <Grid.Column>
                <Header>{eachGoal.goal}</Header>
                <p>{eachGoal.date.slice(0,10)} </p>
                <p> 1/5 Tasks (receive from tasks component, itereate where is_checked === true)</p>
            </Grid.Column>
            <Grid.Column>
                <div>
                <Button onClick={()=>{onDelete(eachGoal)}} size="small"><ioicons.IoTrash/></Button>
                <Button onClick={handleShowModal} size="small"> Goal Info </Button>
                <TasksForm divVisibility={showModal} onCloseClick={handleCloseModal} sendGoalId={eachGoal.id}/>
                </div>
            </Grid.Column>
  
        </Grid.Row>
  


            
        //add to listGoalCards (tasksForm)

  
    )
}

export default CardGoal;