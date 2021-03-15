import React , { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap';
import swal from 'sweetalert';


class MyEvents extends Component {
    constructor(props){
        super(props);
            this.state = {
                loading: true,
                data: [],
                eventData:[]
            }
        }


    componentDidMount = async () => {
        const url = 'https://event-applications.herokuapp.com/events/myevents/';
        const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        const data = {
            user_id: JSON.parse(localStorage.getItem('user'))._id
        } 
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': token,
                }
            })
            this.setState({data: response.data.events, loading: false}); 
        } catch (error) {
            console.log(error);
        }

    }

    handleUnregister = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once unregistered, you will no longer be able to attend this event!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const url = 'https://event-applications.herokuapp.com/events/unattend';
                const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
                const data = {
                    email: JSON.parse(localStorage.getItem('user')).email,
                    eventId: id
                } 
                await axios.post(url, data, {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': token,
                    }
                });
                swal("You have successfully unregistered for this event.", {
                    icon: "success",
                });
                window.location.reload();
            } else {
                swal("Your spot is safe!");
            }
        });
    }

    render(){

        return (
            <>
            <Header />
            {
                this.state.data.map((event, index) => (
                <Card style={{ width: '18rem', float:'left', marginLeft:'7px', marginTop: '10px'}} key={index}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + 'assets/' + event.image}  style={{height:'300px'}}/>
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                            <p>{event.tagline.slice(0,28)  + ' . . .'}</p>
                        </Card.Text>
                        <Button variant="primary" onClick={() => this.handleUnregister(event._id)}>Unregister</Button>
                    </Card.Body>
                </Card>
            ))}

            </>
        )
    }
}

export default MyEvents;