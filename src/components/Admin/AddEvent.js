import { React, Component } from 'react';
import AdminHeader from './AdminHeader';
import swal from 'sweetalert';
import Axios from 'axios';

class AddEvent extends Component {
    state = {
        image: null
    }
    
    handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };

    handleAddEvent = async (e) => {
        e.preventDefault();
        if(this.title === undefined || this.venue === undefined || this.date === undefined || this.speaker === undefined || 
            this.tagline === undefined || this.room_capacity === undefined || this.state.image === null){
                return swal('Sorry', 'No empty fields allowed', 'error');
            }
        const url = 'http://localhost:4000/admin/addevent'
        const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        const data = {
            title: this.title,
            venue: this.venue,
            date: this.date,
            speaker: this.speaker,
            tagline: this.tagline,
            room_capacity: this.room_capacity,
            image: this.state.image.name
        }

        const response = await Axios.post(url, data, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': token
            }
        });
    }
    render(){
        return (
            <>
                <AdminHeader></AdminHeader>
                <div className="container mt-5">
                <div className="row my-2">
                    <div className="col-lg-8 order-lg-2">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a href="###" data-target="#accountinfo" data-toggle="tab" className="nav-link active">Add Event</a>
                            </li>
                        </ul>
                        <div className="tab-content py-4">
                            <div className="tab-pane active" id="accountinfo">
                                <form onSubmit={this.handleAddEvent}>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Title </label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" placeholder="Title" onChange={e => this.title = e.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Venue</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text"  placeholder="Venue" onChange={e => this.venue = e.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Date</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="date" placeholder="Date" onChange={e => this.date = e.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Speaker</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text"  placeholder="Speaker" onChange={e => this.speaker = e.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Tagline</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text"  placeholder="Tagline" onChange={e => this.tagline = e.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Room Capacity</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="number"  placeholder="Room Capacity" onChange={e => this.room_capacity = e.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label text-light">Image</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="file"  placeholder="Image" accept="image/png, image/jpeg"  onChange={this.handleImageChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label"></label>
                                        <div className="col-lg-9">
                                            <input type="reset" className="btn btn-secondary" value="Cancel"/>
                                            <input type="submit" className="btn btn-primary ml-2" value="Save Changes"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default AddEvent;