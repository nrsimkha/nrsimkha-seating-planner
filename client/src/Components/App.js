import React from 'react';
import './App/App.css';
import Table from '../Components/Table/Table';
import Header from '../Components/Header/Header';
import BookingForm from '../Components/BookingForm/BookingForm';

import ColorsInfo from '../Components/ColorsInfo/ColorsInfo';
import XPress from '../utils/XPress';
import { Modal } from '../Components/Modal/Modal';
import { SearchFilter } from '../Components/SearchFilter/SearchFilter';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seatsQuantity: 8,
      tableQuantity: 8,
      seatsForBooking: [],
      bookedSeats: [], 
      highlitedSeats: null,    
      showModalTable: false,
      currentTable: null,
      filterValue: null,
      screenWidth: window.innerWidth
    }
    this.addSeatToBooking = this.addSeatToBooking.bind(this);
    this.removeSeatFromBooking = this.removeSeatFromBooking.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.showModalHandler = this.showModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.updateFilterValue = this.updateFilterValue.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.colors = {
      unavailable: 'grey',
      selected: '#A3E0B4',
      empty: '#4EA8DB',
      highlited: '#DD501D'
    }   

  }

  componentDidMount() {
    
    try {
      XPress.getGuests().then(guests => {
        console.log(guests)
        if(guests){
          if (guests.bookings.length) {  
                
            this.setState({bookedSeats: guests.bookings});
          }
        }

      },
      err => console.log(err)); 
    } catch (error) {
      console.log(error);
    }


    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions(){
    console.log(window.innerWidth);
    this.setState({screenWidth: window.innerWidth})
  }

  updateFilterValue(val){
    this.setState({filterValue: val});
  }

  addGuest(guest){
    XPress.addGuest(guest).then(guest => {
      let guests = this.state.bookedSeats;
      console.log(guest); 
      guests.push(guest.guest[0]);    
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

  showModalHandler = (tableNumber) => {
    console.log(tableNumber);
    this.setState({
      showModalTable: true,
      currentTable: tableNumber
    })
  }
  closeModalHandler= () => {
    this.setState({
      showModalTable: false
    })
  }


    render(){

      var tables = [];
      
      for (let i = 0; i < this.state.tableQuantity; i++) 
      {   

          let highlitedSeats = (this.state.filterValue && this.state.filterValue.table_number === (i+1)) ? this.state.filterValue.seat_number : null;
          let checkedSeats = this.state.seatsForBooking.filter(chosenSeat => chosenSeat[0] === (i+1));
          checkedSeats = checkedSeats.map(seat => seat[1]);   
          let bookedSeats = this.state.bookedSeats.filter(chosenSeat => chosenSeat.table_number === (i+1));     
          bookedSeats = bookedSeats.map(seat => seat.seat_number)  
          
          tables.push(<Table key={i} tableNumber={i+1} tableRadius={(this.state.screenWidth < 600) ? 90 : 120} seatsQuantity={this.state.seatsQuantity} onRemove={this.removeSeatFromBooking} onAdd={this.addSeatToBooking} bookedSeats={bookedSeats} highlitedSeats={highlitedSeats} checkedSeats={checkedSeats} colors={this.colors} showModalHandler={this.showModalHandler}/>);
      }
      
      return (
      <div className="App">
        <Header/>
        
        <div className="main-block">
        
        <Modal show={this.state.showModalTable} bookedSeats={this.state.bookedSeats}  tableRadius={(this.state.screenWidth < 600) ? 90 : 120} closeModalHandler={this.closeModalHandler} table={this.state.currentTable}/>
        <div className="arrangment-ui">
        <SearchFilter guests={this.state.bookedSeats} prompt='Найти гостя' value={this.state.filterValue} onChange={this.updateFilterValue} />
          <div className="container">
          <div className="container-layout">
            {tables}
          </div>
          
          <ColorsInfo colors={this.colors}/>
          </div>
          
          </div>
          <BookingForm addGuest={this.addGuest} onRemove={this.removeSeatFromBooking} seatsForBooking={this.state.seatsForBooking}/>
        </div>
      </div>
      );
  }
}

export default App;
