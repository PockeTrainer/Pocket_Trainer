import React from "react";
import { Navigate, Route } from "react-router-dom";
import MainContent from "./Sign/MainContent";

function PublicRoute({component:Component,isAuthorized}){

    if(isAuthorized){
        return (
            <Navigate to="/"/>
        );
    }
    else{
        return(
            <Component/>
        );
    }
}
export default PublicRoute