import MyNavBar from "./Navbar";
import ListSelectedImages from "./image_components/ListSelectedImages";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const Home = () => {

    const { isAuthenticated, user } = useAuth0();

    

    return(
        <div>
            {isAuthenticated? (
            <div>
            <h1>Home page!</h1>
            <ListSelectedImages/>
            </div>
            ):  ("")}
            <Profile />
        </div>
    )
}

export default Home;