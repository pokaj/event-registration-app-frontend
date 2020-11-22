import React, { Component } from 'react'
import Header from './Header'
import swal from 'sweetalert';
import axios from 'axios';


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: JSON.parse(localStorage.getItem('user')).first_name,
            last_name: JSON.parse(localStorage.getItem('user')).last_name,
            email: JSON.parse(localStorage.getItem('user')).email,
            username: JSON.parse(localStorage.getItem('user')).username,
            image: JSON.parse(localStorage.getItem('user')).picture,
        }
    }

    handleChangePassword = async (e) => {
        if(this.oldpassword === undefined || this.password === undefined || this.confirm_pass === undefined) {return swal('Sorry', 'No empty fields allowed', 'error'); }
        if(this.password !== this.confirm_pass){ return swal('Sorry', 'The passwords entered do not match', 'error'); }
        const url = 'http://localhost:4000/users/updatepassword';
        const data = {
            email: this.state.email,
            currentpassword: this.oldpassword,
            newpassword: this.password
        }
        const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': token
            }
        });
        if(response.data.status === true){
            return swal('Awesome', `${response.data.message}`, 'success')
        }else{
            return swal('Sorry', `${response.data.message}`, 'error')
        }
}
    render() {
        return (
            <>
            <Header></Header>
            <div className="container mt-5">
            <div className="row my-2">
                <div className="col-lg-8 order-lg-2">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a href="###" data-target="#accountinfo" data-toggle="tab" className="nav-link active">Account Details</a>
                        </li>
                        <li className="nav-item">
                            <a href="###" data-target="#changepswd" data-toggle="tab" className="nav-link">Change Password</a>
                        </li>
                    </ul>
                    <div className="tab-content py-4">
                        <div className="tab-pane active" id="accountinfo">
                            <form>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">First name</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" defaultValue={this.state.first_name} placeholder="First name" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">Last name</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" defaultValue={this.state.last_name} placeholder="Last name" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">Email</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="email" defaultValue={this.state.email} placeholder="Email" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">Username</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" defaultValue={this.state.username} placeholder="Username" readOnly/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label"></label>
                                    <div className="col-lg-9">
                                    {/*
                                        <input type="reset" className="btn btn-secondary" value="Cancel"/>
                                        <input type="button" className="btn btn-primary ml-2" value="Save Changes"/>
                                    */}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="tab-pane" id="changepswd">
                            <form>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">Current Password</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="password" placeholder="old password" onChange={e => this.oldpassword = e.target.value}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">New Password</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="password" placeholder="new password" onChange={e => this.password = e.target.value}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label text-light">Confirm Password</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="password" placeholder="confirm password" onChange={e => this.confirm_pass = e.target.value}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label"></label>
                                    <div className="col-lg-9">
                                        <input type="reset" className="btn btn-secondary" value="Cancel"/>
                                        <input type="button" className="btn btn-primary ml-2" value="Confirm" onClick={this.handleChangePassword}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 order-lg-1 text-center">
                    <img src={process.env.PUBLIC_URL + 'assets/' + this.state.image} className="mx-auto img-fluid img-circle d-block text-light rounded-circle" alt="User Profile"/>
                    {/*<h6 className="mt-2">Upload a different photo</h6>
                    <label className="custom-file">
                        <input type="file" id="file" className="custom-file-input"/>
                        <span className="custom-file-control">Choose file</span>
        </label>*/}
                </div>
            </div>
        </div>
            </>
            )
    }
}

export default Profile;