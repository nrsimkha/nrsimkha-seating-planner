import React, {useState} from 'react';
import "./Modal.css";
import Table from '../Table/Table';
import _ from 'lodash';

export const Modal = ({show, closeModalHandler, table, bookedSeats, tableRadius}) => {
    let bookedSeatsForTable = bookedSeats.filter((booking)=> booking.table_number === table);
    const sortSeats = (seats) => {
        return seats.sort((seat1, seat2) => {
          if (seat1.seat_number < seat2.seat_number) {
            return -1;
          } else {
            return 1;
          }
        });
      }
    let colors = {
        unavailable: 'grey',
        selected: '#A3E0B4',
        empty: '#4EA8DB',
        highlited: '#DD501D'
      } 
    let arrayOfBookedSeats = bookedSeatsForTable.map(booking => booking.seat_number);
    const [highlited, setHighlited] = useState();
    const handleMouseOver = (seat) => {
        console.log('handleMouseOver');
        setHighlited(seat.seat_number);
    }
    const handleMouseOut = () => {
        console.log('handleMouseOut');
        setHighlited(null);
    }
    
    return (
        <div className='modal-wrapper'
        style={
            {
                display: show ? 'block' : 'none'
            }            
        }
        >
            <div className='modal-header'>
                <p>Схема рассадки гостей для стола №{table}</p>
                <span onClick={closeModalHandler} className="close-modal-btn">x</span>
            </div>
            <div className="modal-content">
                <div className="modal-body">
                    <h4>Стол №{table}</h4>
                    <div className="table-header">                        
                        <div className="header__item">Номер места </div> 
                        <div className="header__item">Имя </div>  
                        <div className="header__item">Должность </div> 
                        <div className="header__item">Подразделение/Компания</div>   
                    </div> 
                    <div className="table-content">
                    {sortSeats(bookedSeatsForTable).map((seat, index) => {                                                 
                                return (
                                <div className="table-row" key={index} onMouseOver={_.debounce(()=>handleMouseOver(seat), 150)} onMouseOut={_.debounce(handleMouseOut, 150)}>
                                    <div className="table-data">{seat.seat_number}</div>
                                    <div className="table-data">{seat.name}</div>
                                    <div className="table-data">Менеджер</div>
                                    <div className="table-data">Отдел продаж</div>
                                </div>
                                )
                            })
                    }
                    <Table tableNumber={table} tableRadius={tableRadius} seatsQuantity={8} highlitedSeats={highlited} bookedSeats={arrayOfBookedSeats} colors={colors}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={closeModalHandler} className="btn-cancel">Закрыть</button>
                </div>
            </div>
        </div>
    )
    
}
