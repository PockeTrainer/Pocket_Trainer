import React from "react";
import { Route,Navigate,Outlet} from "react-router-dom";

function PrivateRoute({isAuthorized}){

    if(isAuthorized){
        return (
            <Outlet/>
        );
    }
    else{
        return(
            <Navigate to="/account/signIn"/>
        );
    }
}
export default PrivateRoute