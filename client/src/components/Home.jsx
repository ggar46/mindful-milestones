import ListSelectedImages from "./image_components/ListSelectedImages";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const Home = () => {

    const { isAuthenticated } = useAuth0();

    

    return(
        <div>
            {isAuthenticated? (
            <div>
            <h2 className="imagesTitle"> Vision Board </h2>
            <ListSelectedImages/>
            </div>
            ):  ("")}
            <Profile />
        </div>
    )
}

export default Home;