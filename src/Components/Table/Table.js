import React from 'react';
import "./Table.css";
import Seat from '../Seat/Seat';


function Table(props) {   
    
        var seats = [];
        for (var i = 0; i < props.seatsQuantity; i++) {   
            
            let clicked = false;
            let booked = false;
            let highlited = false;
            if(props.checkedSeats && props.checkedSeats.indexOf( i+1 ) !== -1 ){
                clicked = true;
            }        
            if(props.bookedSeats.indexOf( i+1 ) !== -1 ){
                
                booked = true;
            }  
            if(i+1 === props.highlitedSeats){
                
                highlited = true;
            }  
            seats.push(<Seat key={i} seatNumber={i+1} onRemove={props.onRemove} tableNumber={props.tableNumber} tableRadius={props.tableRadius} seatsQuantity={props.seatsQuantity } highlited={highlited} booked={booked} clicked={clicked} colors={props.colors} onAdd={props.onAdd} />);
        }



        return (
            
            <div className="table-clone" data-tableclone={props.tableNumber} >
                
                <div className="table" data-table={props.tableNumber} onClick={()=>props.showModalHandler(props.tableNumber)}>  
                    <div className="table_text">{props.tableNumber}</div>
                </div>
               
                {seats}

            </div>
        )
    
}

export default Table;