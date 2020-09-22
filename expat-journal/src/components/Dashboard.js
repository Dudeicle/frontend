import React, { useEffect } from "react"
import {Route, Link, Switch, useHistory} from "react-router-dom"
import DashboardCard from "./DashboardCard"
import PostForm from "./PostForm"

function Dashboard({onDashboard}) {
    
    const history = useHistory()
  
    const onSubmit = (event) => {
        event.preventDefault()
        history.push("/postform")
    }

    useEffect(() => {
        onDashboard(true)
    })
    
    return (
        <>
{/*     <Link to="/postform"><button onSubmit={onSubmit}>Post Form</button></Link>
​        <Route path="/postform"> */}
            <DashboardCard />
            <PostForm />
            {/* </Route> */}
            {/* <Route path="/dashboardcard"> */}
               
            {/* </Route> */}
        </>
    )
}

export default Dashboard;