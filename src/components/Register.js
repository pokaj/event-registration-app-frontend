import { React, Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class Register extends Component{

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.password !== this.confirm_pass){
            return swal("Error!", "Passwords do not match!", "error");
        }else{
            const { history } = this.props;
        const data = {
            first_name: this.firstname,
            last_name: this.lastname,
            email: this.email,
            username: this.username,
            image: 'uploads/profile_pics/' + this.image.replace(/^.*[\\\/]/, ''),
            password: this.password
        };
        const url = 'http://localhost:4000/users/signup';
        axios.post(url, data)
        .then(response =>{
            if(response.data.status === true){
                history.push('/');
            }
        })
        .catch(error => console.log(error))
        }
    }
    render(){
        return(
        <>    
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={process.env.PUBLIC_URL + '/assets/images/img-01.png'} alt='Logo'/> 
                        </div>

                        <form className="login100-form validate-form">
                            <span className="login100-form-title">
                                Sign Up
                            </span>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" id="firstname" placeholder="First Name" onChange={e => this.firstname = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" id="lastname" placeholder="Last Name" onChange={e => this.lastname = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" id="email" placeholder="Email" onChange={e => this.email = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" id="username" placeholder="Username" onChange={e => this.username = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="file" id="iamge" placeholder="Image" onChange={e => this.image = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" onChange={e => this.password = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" type="password" name="confirm_pass" placeholder="Confirm password" onChange={e => this.confirm_pass = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.handleSubmit}>
                                    Login
                                </button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">
                                    Forgot
                                </span>
                                <a className="txt2" href="#forgotdetails">
                                    Username / Password?
                                </a>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2" href="/">
                                    Login
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default Register;