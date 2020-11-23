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
        const url = 'http://localhost:4000/admin/getdetails';
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
                const url = 'http://localhost:4000/admin/delete_event'; 
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
                // window.location.reload();
            } else {
                swal("No action performed!");
            }
        });
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
                {
                    this.state.data.map((event, index) => (
                    <tr key={index}>
                    <td>{event.title}</td>
                    <td>{event.venue}</td>
                    <td>{moment(event.date).format('DD/MM/YYYY')}</td>
                    <td>{event.speaker}</td>
                    <td>{event.room_capacity}</td>
                    <td>{event.current_seat_number}</td>
                    <td>
                    <Icon className='pointer' icon={eyeOutlined} />
                    <Icon className='pointer' id='edit' icon={editIcon} />
                    <Icon className='pointer' id='delete' icon={trashcanIcon} onClick={() => this.handleDeleteEvent(event._id)}/>
                    </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                </div>
            }
            </>
        )
    }
}

export default EventDetails

