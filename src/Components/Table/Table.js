import React from 'react';
import "./Table.css";
import Seat from '../Seat/Seat';

class Table extends React.Component {

    render(){
        var seats = [];
        for (var i = 0; i < this.props.seatsQuantity; i++) {   
            let clicked = false;
            let booked = false;
            if(this.props.checkedSeats.indexOf( i+1 ) !== -1 ){
                clicked = true;
                console.log(this.props.checkedSeats);
                console.log(i);
            }        
            if(this.props.bookedSeats.indexOf( i+1 ) !== -1 ){
                booked = true;
            }  
            seats.push(<Seat key={i} seatNumber={i+1} onRemove={this.props.onRemove} tableNumber={this.props.tableNumber} tableRadius={this.props.tableRadius} seatsQuantity={this.props.seatsQuantity } booked={booked} clicked={clicked} onAdd={this.props.onAdd} />);
        }
        return (
            
            <div className="table-clone" data-tableclone={this.props.tableNumber}>
                
                <div className="table" data-table={this.props.tableNumber}>  
                    <div className="table_text">{this.props.tableNumber}</div>
                </div>
                {seats}

            </div>
        )
    }
}

export default Table;