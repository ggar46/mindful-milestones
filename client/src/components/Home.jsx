import MyNavBar from "./Navbar";
import ListSelectedImages from "./image_components/ListSelectedImages";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {

    const { isAuthenticated, user } = useAuth0();

    return(
        <div>
            {isAuthenticated? (
            <div>
            <h1 className="homeTitle">Home page!</h1>
            <h2 className="imagesTitle"> Images </h2>
            <ListSelectedImages/>
            </div>
            ):  ("")}

        </div>
    )
}

export default Home;