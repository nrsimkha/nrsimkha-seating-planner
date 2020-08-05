import React from 'react';
import './App/App.css';
import Table from '../Components/Table/Table';
import Header from '../Components/Header/Header';
import BookingForm from '../Components/BookingForm/BookingForm';
import GuestDataTable from '../Components/GuestDataTable/GuestDataTable';
import XPress from '../utils/XPress';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {            
      tableRadius: 120,
      seatsQuantity: 8,
      tableQuantity: 3,
      seatsForBooking: [],
      bookedSeats: []
    }
    this.addSeatToBooking = this.addSeatToBooking.bind(this);
    this.removeSeatFromBooking = this.removeSeatFromBooking.bind(this);
    this.addGuest = this.addGuest.bind(this);
  }

  componentDidMount() {
    
    XPress.getGuests().then(guests => {
      console.log(guests.bookings.length);
      if (guests.bookings.length) {  
        console.log(guests.bookings);      
        this.setState({bookedSeats: guests.bookings});
      }
    });
  }
  addGuest(guest){
    XPress.addGuest(guest).then(guest => {
      let guests = this.state.bookedSeats;
      console.log(guest); 
      guests.push(guest.guest);    
      this.setState({bookedSeats: guests});
      
    });
  }
  addSeatToBooking(table, seat){
    let seats = this.state.seatsForBooking;
    if(seats.find(chosenSeat =>   chosenSeat.seat_number === seat && chosenSeat.table_number === table)){
      return;      
    }
    seats.push([table, seat]);
    this.setState({
      seatsForBooking: seats
    })
    
  }
  removeSeatFromBooking(table, seat){
    let seats = this.state.seatsForBooking.filter(chosenSeat =>  JSON.stringify(chosenSeat) !== JSON.stringify([table, seat]));
    this.setState({
      seatsForBooking: seats
    })
  }
    render(){

      var tables = [];
      
      for (let i = 0; i < this.state.tableQuantity; i++) 
      {
          let checkedSeats = this.state.seatsForBooking.filter(chosenSeat => chosenSeat[0] === (i+1));
          checkedSeats = checkedSeats.map(seat => seat[1]);   
          let bookedSeats = this.state.bookedSeats.filter(chosenSeat => chosenSeat.table_number === (i+1));     
          bookedSeats = bookedSeats.map(seat => seat.seat_number)  
          tables.push(<Table key={i} tableNumber={i+1} tableRadius={this.state.tableRadius} seatsQuantity={this.state.seatsQuantity} onRemove={this.removeSeatFromBooking} onAdd={this.addSeatToBooking} bookedSeats={bookedSeats} checkedSeats={checkedSeats}/>);
      }
      
      return (
      <div className="App">
        <Header/>
        <div className="main-block">
        <div className="arrangment-ui">
          <div className="container">
          
            {tables}        
          </div>
          <GuestDataTable bookedSeats={this.state.bookedSeats} tableQuantity={this.state.tableQuantity}/>
          </div>
          <BookingForm addGuest={this.addGuest} onRemove={this.removeSeatFromBooking} seatsForBooking={this.state.seatsForBooking}/>
        </div>
      </div>
      );
  }
}

export default App;
