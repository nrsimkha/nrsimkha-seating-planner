import React from 'react';
import "./Seat.css";

function Seat (props) {  


    const addSeat = () => {
        if(!props.booked && !props.clicked){
            props.onAdd(props.tableNumber, props.seatNumber);
        }else if(props.clicked){
            props.onRemove(props.tableNumber, props.seatNumber);
        }
        else{
            console.log("Unavailabe seat");
        }
        
    }

    const calculateCoordinates = (i) => {

       let styles = {
            width: 0.46*props.tableRadius,
            height: 0.46*props.tableRadius,
            left: "",
            top: "",
            backgroundColor: props.highlited === true 
                ? `${props.colors.highlited}` 
                : (props.booked === true 
                    ? `${props.colors.unavailable}`
                    : ((props.clicked === true) 
                        ? `${props.colors.selected}` 
                        : `${props.colors.empty}`))
            
        }
        let seatsAngleRange = 360/props.seatsQuantity;
        
        let left = (Math.sin(degrees_to_radians(seatsAngleRange)* i)  * props.tableRadius + props.tableRadius) - styles.width/2;
        let top = (Math.cos(degrees_to_radians(seatsAngleRange)* i)  * (-1) * props.tableRadius + props.tableRadius) - styles.height/2;
        styles.left = `${left}px`;
        styles.top = `${top}px`;
        return styles;
    }
    const degrees_to_radians = (degrees) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    }
                  
    return <div style={calculateCoordinates(props.seatNumber-1)} className="seat" data-seat={props.seatNumber} onClick={addSeat}>
        <div className="seat_text">{props.seatNumber}</div>
    </div>;
        
        
    }


export default Seat;