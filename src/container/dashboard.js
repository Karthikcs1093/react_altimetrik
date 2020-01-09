import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = (props) => {
    const { reponse } = props.userCredentials;
    return (
        <React.Fragment>
            <div className="container offset-md-3 col-md-6 offset-md-3 dashboard">
                <div className="mt10">
                    <span>{reponse && reponse.msg}</span>
                    <Link to="/" className="pd10">Log Out Here</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;