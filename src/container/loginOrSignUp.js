import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formHandler } from './action';
import { registerUser, loginUser } from './thunk';
import states from '../utility/states';
import '../styles/index.css';
import { createHashHistory } from 'history';

class LoginOrSignUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showRegister: false,
            err: {}
        }
        this.listStates = this.listStates.bind(this);
    }

    activeRegisterForm(change) {
        this.setState({
            showRegister: !change
        })
    }

    listStates = (val) => {
        let options = [];
        let i = 0;
        for (let key in val) {
            options.push(<option value={key} key={i}>{val[key]}</option>);
            i++;
        }
        return options;
    }

    handlChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        let isAlphabets = /^[A-Za-z]+$/;
        if(name === 'phone') {
            this.props.formHandler(name, this.formatPhoneNumber(value));
        } else {
            this.props.formHandler(name, value);
        }
        if((name === 'name' || name === 'regName')) {
            if(!value.match(isAlphabets) && value !== '') {
                this.setState({
                    err: {...this.state.err, "userName": "User Name must be Alphabets"}
                });
            } else {
                this.setState({
                    [name]: value.match(isAlphabets) ? value : '',
                    err: ''
                })
            }
        } else if(name === 'email') {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(value) && value.length) {
                this.setState({
                    err: {...this.state.err, "email": "Ivalid Email"}
                });
            } else {
                this.setState({
                    [name]: value,
                    err: {...this.state.err, "email": ""}
                });
            }
        }
        else {
            this.setState({
                [name]: value
            })
        }
    }

    formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return phoneNumberString;
    }

    handleSubmit = (e)=> {
        const { name, pwd, regName, phone, email, regPassword } = this.props.formValue;
        const regData = {
            regName,
            phone,
            email,
            regPassword
        }
        const loginData = {
            name,
            pwd
        }
        if(regName) {
            this.activeRegisterForm('change')
            this.props.registerUser(regData);
        } else if(name) {
            this.props.loginUser(loginData);
        }
    }

    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps.userCredentials) !== JSON.stringify(this.props.userCredentials)) {
            const { loginData, registerData } =  this.props.userCredentials;
            const {reponse} = loginData;
            const {error} = reponse || {};
            const regMsg = registerData && registerData.reponse && registerData.reponse.msg;
            console.log(regMsg, "regMsg")
            if(error || regMsg) {
                this.setState({
                    err: {...this.state.err, "LoginErr": (error ? error : regMsg)}
                })
            }
        }
    }

    render() {
        const { showRegister, err } = this.state;
        const { name, pwd, regName, phone, email, regPassword } = this.props.formValue;
        console.log(err)
        return(
            <div className="container">
                <form className="LoginOrRegisterForm offset-md-3 col-md-6 offset-md-3" onSubmit={(e)=>{e.preventDefault()}}>
                {err && err.LoginErr && <label htmlFor="inputName" className="col-md-12 col-form-label errMsg text-danger">{err.LoginErr}</label>}
                    {!showRegister ? 
                        <React.Fragment>{name && err.userName && <label htmlFor="inputName" className="col-md-12 col-form-label errMsg text-danger">{err.userName}</label>}
                            <div className={showRegister ? 'row': ''}>
                                <div className={!showRegister ? 'login' : 'col-md-6'}>
                                    <input type="text" className="user-name" name="name" onChange={(e)=>{this.handlChange(e)}} value={name ? name : ''} placeholder="Enter User Name"/>
                                    
                                </div>
                                <div className={!showRegister ? 'login' : 'col-md-6'}>
                                    <input type="password" className="user-pwd" name="pwd" onChange={(e)=>{this.handlChange(e)}} value={pwd ? pwd :''} placeholder="Enter Password"/>
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className={showRegister ? 'row': ''}>
                                <div className="register col-md-6">
                                    <input type="text"  name="regName" value={regName ? regName : ''} onChange={(e)=>{this.handlChange(e)}} placeholder="Enter Name"/>
                                    {regName && err.userName && <label htmlFor="inputName" className="col-md-12 col-form-label errMsg text-danger">{err.userName}</label>}
                                </div>
                                <div className="number col-md-6">
                                    <input type="text"  name="phone" value={phone ? phone : ''} onChange={(e)=>{this.handlChange(e)}} placeholder="Eneter Phone Number"/>
                                </div>
                            </div>
                            <div className={showRegister ? 'row': ''}>
                                <div className="email col-md-6">
                                    <input type="text" name="email" value={email ? email : ''} onChange={(e)=>{this.handlChange(e)}} placeholder="Enter Email"/>
                                    {err.email && <label htmlFor="email" className="col-md-12 col-form-label errMsg text-danger">{err.email}</label>}
                                </div>
                                <div className="select col-md-6">
                                    <select type="select" name="country">
                                        <option value="">SELECT</option>
                                        {
                                            this.listStates(states)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className={showRegister ? 'row': ''}>
                                <div className="password col-md-6">
                                    <input type="password" name="regPassword" value={regPassword ? regPassword : ''} onChange={(e)=>{this.handlChange(e)}} placeholder="Enter Password"/>
                                </div>
                                <div className="select col-md-6">
                                    <label className="radio-inline">
                                        <input type="radio" name="optradio" />Male</label>
                                    <label className="radio-inline"> <input type="radio" name="optradio" />Female</label>
                                </div>
                            </div>
                            <div className="password">
                                
                            </div>
                        </React.Fragment>
                    }
                        <div>
                            <button  className="button" onClick={(e)=>{this.handleSubmit(e)}}>
                                {!showRegister ? 'Login' : 'Register'}
                            </button>
                        </div>
                    <div>
                        <button  className="button" placeholder="Enter Password" onClick={() => {this.activeRegisterForm(showRegister)}}>
                            {showRegister ? 'Go back to Login' : 'For Register Click Here' }
                        </button>
                    </div>
                </form>
            </div>
        );     
    }
}

const mapStateToProps = (state) => {
    const { formHandlingData, userCredentialData } = state;
    return {
        formValue: formHandlingData,
        userCredentials : userCredentialData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        formHandler: bindActionCreators(formHandler, dispatch),
        registerUser: bindActionCreators(registerUser, dispatch),
        loginUser: bindActionCreators(loginUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrSignUp);