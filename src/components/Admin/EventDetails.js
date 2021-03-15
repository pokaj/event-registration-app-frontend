import { React, Component } from 'react';
import AdminHeader from './AdminHeader';
import moment from 'moment';
import { Icon } from '@iconify/react';
import trashcanIcon from '@iconify-icons/octicon/trashcan';
import editIcon from '@iconify-icons/grommet-icons/edit';
import eyeOutlined from '@iconify-icons/ant-design/eye-outlined';
import axios from 'axios';
import swal from 'sweetalert';
import { WindMillLoading } from 'react-loadingg';
import '../../style.css';




class EventDetails extends Component {
    state = {
        loading:true,
        data: []
    }

    componentDidMount = async () => {
        const url = 'https://event-applications.herokuapp.com/admin/getdetails';
        const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        const data = {}
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': token
            }
        });
        localStorage.setItem('events', JSON.stringify(response.data.events));
        this.setState({
            data:response.data.events, 
            loading: false,
        });
    }

    handleDeleteEvent = async (event_id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, an event cannot be recovered!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const url = 'https://event-applications.herokuapp.com/admin/delete_event';
                const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
                const data = {
                    event_id: event_id
                }
                const response = await axios.post(url, data, {
                    headers: {
                        'Authorization': token,
                    }
                });
                if(response.data.status === true){
                    swal(response.data.message, {
                        icon: "success",
                    });
                }else{
                    swal(response.data.message, {
                        icon: "warning",
                    });
                }
            } else {
                swal("No action performed!");
            }
        });
    }

    handleEditEvent = async (event_id) => {
        return alert(event_id);
        const url = `https://event-applications.herokuapp.com/admin//editevent/${event_id}`;
        const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }

    render() {
        return (
            <>
                <AdminHeader></AdminHeader>
                {this.state.loading? <div><WindMillLoading /><p id="loading">Loading...</p></div> :
                    <div className="container mt-5">
                        <table className="table table-hover table-light">
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Venue</th>
                                <th scope="col">Date</th>
                                <th scope="col">Speaker</th>
                                <th scope="col">Room Capacity</th>
                                <th scope="col">Current Seat Number</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.data.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.title}</td>
                                    <td>{event.venue}</td>
                                    <td>{moment(event.date).format('DD/MM/YYYY')}</td>
                                    <td>{event.speaker}</td>
                                    <td>{event.room_capacity}</td>
                                    <td>{event.current_seat_number}</td>
                                    <td>
                                        <a data-toggle="modal" data-target=".events-modal" href={"###"}><Icon className='pointer' icon={eyeOutlined} /></a>
                                        <a data-toggle="modal" data-target="#edit_event"><Icon className='pointer' id='edit' icon={editIcon} /></a>
                                        <Icon className='pointer' id='delete' icon={trashcanIcon} onClick={() => this.handleDeleteEvent(event._id)}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
                <div className="modal fade events-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Venue</th>
                                    <th scope="col">Room Capacity</th>
                                    <th scope="col">Current Seat Number</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.data.map((event, index) => (
                                        <tr key={index}>
                                            <td><p>{event.title}</p></td>
                                            <td><p>{event.venue}</p></td>
                                            <td><p>{event.room_capacity}</p></td>
                                            <td><p>{event.current_seat_number}</p></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                <div className="modal fade" id="edit_event" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {
                                    this.state.data.map((event, index) => (
                                        <div key={index}>
                                            <h5 className="modal-title" id="exampleModalLabel">{event.title}</h5>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="modal-body">
                                <form>
                                    {
                                        this.state.data.map((event, index) => (
                                            <div key={index}>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                                    <input type="text" className="form-control" id="recipient-name" value={event.title} onChange={(e)=> e.target.value}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Venue:</label>
                                                    <input type="text" className="form-control" id="recipient-name" value={event.venue} onChange={(e)=> e.target.value}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Date:</label>
                                                    <input type="text" className="form-control" id="recipient-name" value={event.date} onChange={(e)=> e.target.value}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Speaker:</label>
                                                    <input type="text" className="form-control" id="recipient-name" value={event.speaker} onChange={(e)=> e.target.value}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Room Capacity:</label>
                                                    <input type="text" className="form-control" id="recipient-name" value={event.room_capacity} onChange={(e)=> e.target.value}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
        )
    }
}

export default EventDetails

