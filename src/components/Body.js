import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Modal from './Modal';
import '../style.css';
import { WindMillLoading } from 'react-loadingg';
class Body extends Component{
    constructor(props){
    super(props);
        this.state = {
            open: false,
            loading: true,
            data: null,
            eventData:[]
        }
    this.handleFetchEvent = this.handleFetchEvent.bind(this);
}

    async componentDidMount(){
        const url = `https://event-applications.herokuapp.com/events/`;
        try {
            const response = await axios.get(url);
            this.setState({data: response.data.events, loading: false});
        } catch (error) {
            console.log(error);
        }
    }

    async handleFetchEvent(id){
        const url = `https://event-applications.herokuapp.com/events/${id}`;
        const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': token,
                }
            });
            let eventData = response.data.Event;
            this.setState({eventData, loading: false, open:true});
        } catch (error) {
            console.log(error);
        }
    }

    handleClose = () => this.setState({open:false})
    
    render(){

        return (
            <>
            
            <Modal 
                openM={this.state.open} 
                onClose={this.handleClose}
                eventData={this.state.eventData}>
            </Modal>
            {this.state.loading ? <div> <WindMillLoading /> <p id="loading">Loading available events . . . </p></div> : 
                this.state.data.map((event, index) => (
                <Card style={{ width: '18rem', float:'left', marginLeft:'7px', marginTop: '10px'}} key={index}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + 'assets/' + event.image}  style={{height:'300px'}}/>
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                            <span>{event.tagline.slice(0,28)  + ' . . .'}</span>
                        </Card.Text>
                        <Button variant="primary" onClick={() => this.handleFetchEvent(event._id)}>Book Event</Button>
                    </Card.Body>
                </Card>
                ))}
            </>
        )
    }
}

export default Body;


