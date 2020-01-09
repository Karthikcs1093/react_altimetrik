import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { history } from 'history';
import LoginOrSignUp from './loginOrSignUp';
import Dashboard from './dashboard';
import { connect } from 'react-redux';

class Routes extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { userCredentials } = this.props;
        return (
            <HashRouter history={history}>
                <Switch>
                    <Route exact path="/" component={LoginOrSignUp} />
                    <Route path="/dashboard" render={(props) => <Dashboard userCredentials={userCredentials} {...props}/> } />
                </Switch>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    const { userCredentialData } = state;
    return {
        userCredentials : userCredentialData && userCredentialData.loginData
    }
}

export default connect(mapStateToProps, null)(Routes);