import FormGoal from "./FormGoal";
import ListStudents from "./ListStudents";
import MyNavBar from "./Navbar";

const Goals = () => {

    return(
        <div>
            <MyNavBar/>
            <h1>Goals page!</h1>
            <FormGoal/>
            <ListStudents/>

        </div>
    )
}

export default Goals;