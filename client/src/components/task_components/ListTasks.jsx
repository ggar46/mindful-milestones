import TaskForm from "./AddTaskForm";

const ListTasks = ({divVisibility, sendGoalId}) => {
    
    const handleShow = () => setShow(true); 
    const [tableTaskData, settableTaskData] = useState(
        {
         id: sendGoalId,
         goal_fkey: "",
         task_text: "",
         isChecked: FALSE,
       }
     );


    return(
        <div>
       
        </div>
    )
}

export default ListTasks;