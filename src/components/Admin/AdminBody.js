import { React, Component } from 'react';
import '../../style.css';
import axios from 'axios';
import { WindMillLoading } from 'react-loadingg';



class AdminBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            events: [],
            users: []
        }
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
            events:response.data.events, 
            users: response.data.users,
            loading: false,
        });
    }

    render(){
        return (
            <>
                {this.state.loading ? <div><WindMillLoading /> <p id="loading">Loading . . . </p></div> :
                    <div>
                        <a data-toggle="modal" data-target=".events-modal" href={"###"}>
                            <div className="admin-card">
                                <div className="card text-white bg-warning mb-3" style={{ maxWidth: '18rem' }}>
                                    <div className="card-header">Current Number of Events</div>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{textAlign: 'center'}}>{this.state.events.length}</h5>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a data-toggle="modal" data-target=".users-modal" href={"###"}>
                            <div className="admin-card">
                                <div className="card text-white bg-warning mb-3" style={{ maxWidth: '18rem' }}>
                                    <div className="card-header">Current Number of Users</div>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{textAlign: 'center'}}>{this.state.users.length}</h5>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <div className="modal fade users-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.users.map((user, index) => (
                                                <tr key={index}>
                                                    <td><p>{user.first_name}</p></td>
                                                    <td><p>{user.last_name}</p></td>
                                                    <td><p>{user.username}</p></td>
                                                    <td><p>{user.email}</p></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

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
                                            this.state.events.map((event, index) => (
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
                    </div>
                }
                </>
        )
    }
}

export default AdminBody;