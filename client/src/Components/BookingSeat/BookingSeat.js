import React from 'react';
import "./BookingSeat.css";

class BookingSeat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
        this.removeSeat = this.removeSeat.bind(this);        
        this.addGuest = this.addGuest.bind(this); 
        this.handleNameChange = this.handleNameChange.bind(this); 
    }
    removeSeat(){
        //console.log([this.props.seat[0], this.props.seat[1]]);
        this.props.onRemove(this.props.table, this.props.seat);
    }
    addGuest(){        
        this.props.addGuest({            
            is_booked: 1,
            name: this.state.name,
            table_number: this.props.table,
            seat_number: this.props.seat,
          });
        this.setState({name:""}); 
        this.removeSeat(this.props.table, this.props.seat);
    }
    handleNameChange(event){
        console.log(event);
        this.setState({name: event.target.value});        

    }
    render(){

        return (   
                <div className="booking-form_input-block">
                    <span className="close" onClick={this.removeSeat}></span> 
                    <div className="booking-form_text"> Стол {this.props.table} Место {this.props.seat}</div>
                    <div className="booking-form_input">
                        <input placeholder="Введите имя" value={this.state.name} onChange={this.handleNameChange}></input>
                        <div className="booking-form_submit-button" onClick={this.addGuest}>ОК</div>
                    </div>                   
                    
                </div>
              
          
        )
    }
}

export default BookingSeat;