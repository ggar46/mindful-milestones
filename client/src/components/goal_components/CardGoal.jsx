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


    const getGoalProperty = (propertyName) => {
        if (eachGoal) {
          return eachGoal[propertyName] || '';
        } else {
          console.log('you got it');
          return '';
        }
      };
    
    const eachGoalName = getGoalProperty('goal');
    const eachGoalDate = getGoalProperty('date')?.slice(0, 10);
    const eachGoalImage = getGoalProperty('image_fkey');

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
        <Grid.Row stretched className="bordered"  data-testid="navbar">
            <Grid.Column>
                <Image src={eachGoalImage}/>
            </Grid.Column>
            <Grid.Column>
                <Header>{eachGoalName}</Header>
                <p id="target-date">Target Date: {eachGoalDate} </p>
                <p id="tasks-completed"> {countOfChecked}/{total} tasks completed</p>
            </Grid.Column>
            <Grid.Column>
                <div>
                <Button id="trash" onClick={()=>{onDelete(eachGoal)}} size="small"><ioicons.IoTrash/></Button>
                <Button onClick={handleShowModal} size="small"> Goal Info </Button>
                <TasksForm onNumbers={handleCheckedCount} divVisibility={showModal} onCloseClick={handleCloseModal} sendGoal={eachGoal}/>
                </div>
            </Grid.Column>
        </Grid.Row>
    )
}

export default CardGoal;