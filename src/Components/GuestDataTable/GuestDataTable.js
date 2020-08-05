import React from 'react';
import "./GuestDataTable.css";

class GuestDataTable extends React.Component {

    sortSeats(seats) {
        return seats.sort((seat1, seat2) => {
          if (seat1.seat_number < seat2.seat_number) {
            return -1;
          } else {
            return 1;
          }
        });
      }
    render(){
        let guestTable =[];
        let guestList = this.props.bookedSeats;
        for (let i=0; i<this.props.tableQuantity; i++){
            let bookedSeatsForCurrentTable = guestList.filter(seat => seat.table_number === (i+1));
            bookedSeatsForCurrentTable = this.sortSeats(bookedSeatsForCurrentTable);
            guestTable.push(<React.Fragment>
                <div>Стол {i+1}</div>   
                <div className="tableData">
                    {
                        bookedSeatsForCurrentTable.map((seat, index) => {
                            return  (                   
                            <div className="row">
                                <div className="seatNumber">Место {seat.seat_number}</div>
                                <div className="personName">{seat.name}</div>
                            </div>)
                        })
                    }

                    
                </div> </React.Fragment>   
               )
            
        }
        return <React.Fragment>{guestTable}</React.Fragment>

    }
}

export default GuestDataTable;