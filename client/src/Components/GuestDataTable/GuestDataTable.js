import React from 'react';
import "./GuestDataTable.css";

class GuestDataTable extends React.Component {
    constructor(props){
        super(props);               
        this.getGuestListForTable = this.getGuestListForTable.bind(this);
        this.tableRef = React.createRef();
    }

    sortSeats(seats) {
        return seats.sort((seat1, seat2) => {
          if (seat1.seat_number < seat2.seat_number) {
            return -1;
          } else {
            return 1;
          }
        });
      }

    getGuestListForTable(tableNumber){
        let bookedSeatsForCurrentTable = this.props.bookedSeats.filter(seat => seat.table_number === (tableNumber));        
        bookedSeatsForCurrentTable = this.sortSeats(bookedSeatsForCurrentTable);
        return bookedSeatsForCurrentTable;
    }

    handleClick() {
        const table = this.tableRef.current;
        table.classList.toggle('is-table-open')
    }
    
    render(){
        let guestTable =[]; 
        for (let i=0; i<this.props.tableQuantity; i++){            
            let bookedSeatsForCurrentTable = this.getGuestListForTable(i+1);           
            if(bookedSeatsForCurrentTable.length){  
            guestTable.push(<div key={i} >
            <div className="main_table-row" onClick={()=>{this.props.showGuestsForTable(i)}}>
                <div className={(this.props.guestsForTable[i]['isTableActive']) ? "arrow-up" : "arrow-down"} ></div>
                <div className="tableInfo">Стол {i+1} </div>
                
            </div>
                <div className="table-content">
                    {   
                        (this.props.guestsForTable[i]['isTableActive']) ?
                        bookedSeatsForCurrentTable.map((seat, index) => {
                                return  (                   
                                <div className="table-row" key={index}>
                                    
                                    <div className="table-data">{i+1}</div>
                                    <div className="table-data">{seat.seat_number}</div>
                                    <div className="table-data">{seat.name}</div>
                                </div>)
                            }) : null
                    }

                                     
                </div> 
                </div>   
               )
             }
        }
        return <div className="table-block">
            
                <div className="table-header">
                        <div className="header__item">Номер стола </div>
                        <div className="header__item">Номер места </div> 
                        <div className="header__item">Имя </div>    
                </div> 
          
            {guestTable}
            </div>

    }
}

export default GuestDataTable;