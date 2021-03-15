import { React, Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


class Login extends Component{

    handleSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const data = {
            email: this.email,
            password: this.password
        }   
        const url = 'https://event-applications.herokuapp.com/users/login/';
        axios.post(url, data)
        .then(response =>{
            if(response.data.status === true){
                localStorage.setItem('user', JSON.stringify(response.data.user[0]));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                if(response.data.user[0].isadmin){
                    history.push('/admin-dashboard');
                }else{
                    history.push('/dashboard');
                }
            }else{
                swal("Sorry", `${response.data.message}`, "error");
            }

            
        })
        .catch(error=>{
            console.log(error);
        })
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
                                Login
                            </span>

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" id="email" placeholder="Email" onChange={e => this.email = e.target.value}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" onChange={e => this.password = e.target.value}/>
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
                                <a className="txt2" href="/register">
                                    Create your Account
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

export default Login;