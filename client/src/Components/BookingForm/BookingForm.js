import React from 'react';
import "./BookingForm.css";
import BookingSeat from '../BookingSeat/BookingSeat.js';

class BookingForm extends React.Component {
    render(){

        return (
            <div className="booking-form">                
                <div className="booking-form_title"> Выбранные места</div>                
                {
                    this.props.seatsForBooking.map((seat, index) => {
                        return <BookingSeat addGuest={this.props.addGuest} onRemove={this.props.onRemove} seat={seat[1]} table={seat[0]} key={index} />
                    })
                }  
            </div>
        )
    }
}

export default BookingForm;