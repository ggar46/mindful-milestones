import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0(); //user.sub

    //A function to handle the post request
    async function insertUserToDB() {
      const userObj = { user_id: user.sub, email: user.email };
      await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  
    useEffect(() => {
      if (user) insertUserToDB();
    }, [user]);


    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    return (
      isAuthenticated && (
        <div>

        </div>
      )
    );
  };
  
  export default Profile;