import ListGoalCards from "./ListGoalCards";
import MyNavBar from "../Navbar";

const Goals = () => {

    return(
        <div>
            <MyNavBar/>
            <h2 className="goals-title"> Goals </h2>
            <ListGoalCards/>

        </div>
    )
}

export default Goals;