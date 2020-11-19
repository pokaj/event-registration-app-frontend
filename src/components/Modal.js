import  React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';

class EventsModal extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    registerEvent = async (id)=>{
      const url = 'http://localhost:4000/events/attend'; 
      const data = {
        email: JSON.parse(localStorage.getItem('user')).email,
        eventId: id
      }
      const token = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
      const response = await axios.post(url, data, {
        headers: { 
          'Authorization': token
        }
      });
      const status = await response.data.status;
      const message = await response.data.message;
      if(status === false){
        swal("Sorry", `${message}`, "info");
      }else{
        swal("Awesome", `${message}`, "success");
      }
      
    }



    render(){
      const{_id, title, tagline, venue, date, speaker, current_seat_number, room_capacity  } = this.props.eventData;
      const reformattedDate = moment(date).format('YYYY/MM/DD');

        return (    
        <>
        <Modal
          show={this.props.openM}
          onHide={this.props.onClose}
          backdrop="static"
          keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Title: {title} </p>
            <p>Tagline: {tagline} </p>
            <p>Venue: {venue} </p>
            <p>Date: {reformattedDate} </p>
            <p>Speaker: {speaker} </p>
            <p>Seats Left: {room_capacity - current_seat_number} </p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{this.registerEvent(_id)}}>Confirm</Button>
          </Modal.Footer>
        </Modal>
        </>
        )
    }
  }

  export default EventsModal;
