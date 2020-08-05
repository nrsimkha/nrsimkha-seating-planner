import React from 'react';
import "./Seat.css";

class Seat extends React.Component {  
        constructor(props){
            super(props);
            this.addSeat = this.addSeat.bind(this);
            this.calculateCoordinates = this.calculateCoordinates.bind(this);
            
        }

        addSeat(){
            if(!this.props.booked && !this.props.clicked){
                this.props.onAdd(this.props.tableNumber, this.props.seatNumber);
            }else if(this.props.clicked){
                this.props.onRemove(this.props.tableNumber, this.props.seatNumber);
            }
            else{
                console.log("Unavailabe seat");
            }
            
        }

    calculateCoordinates(i){

       let styles = {
            width: 56,
            height: 56,
            left: "",
            top: "",
            backgroundColor: this.props.booked === true ? 'grey': (this.props.clicked === true ? '#A3E0B4': '#4EA8DB')
            
        }
        let seatsAngleRange = 360/this.props.seatsQuantity;
        
        let left = (Math.sin(this.degrees_to_radians(seatsAngleRange)* i)  * this.props.tableRadius + this.props.tableRadius) - styles.width/2;
        let top = (Math.cos(this.degrees_to_radians(seatsAngleRange)* i)  * (-1) * this.props.tableRadius + this.props.tableRadius) - styles.height/2;
        styles.left = `${left}px`;
        styles.top = `${top}px`;
        return styles;
    }
    degrees_to_radians(degrees){
        var pi = Math.PI;
        return degrees * (pi/180);
        }
    render(){                
        

       return <div style={this.calculateCoordinates(this.props.seatNumber-1)} className="seat" data-seat={this.props.seatNumber} onClick={this.addSeat}></div>;
        }
        
    }


export default Seat;