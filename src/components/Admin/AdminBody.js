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
            <div className="admin-card">
                <div className="card text-white bg-warning mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">Current Number of Events</div>
                    <div className="card-body">
                        <h5 className="card-title" style={{textAlign: 'center'}}>{this.state.events.length}</h5>
                    </div>
                </div>
            </div>

            <div className="admin-card">
            <div className="card text-white bg-warning mb-3" style={{ maxWidth: '18rem' }}>
                <div className="card-header">Current Number of Users</div>
                <div className="card-body">
                    <h5 className="card-title" style={{textAlign: 'center'}}>{this.state.users.length}</h5>
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