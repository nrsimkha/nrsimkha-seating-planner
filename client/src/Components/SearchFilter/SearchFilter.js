import React, {useState, useRef, useEffect} from 'react';
import "./SearchFilter.css";

export const SearchFilter = ({guests, prompt, value, onChange, onClear}) => {
        const [open, setOpen] = useState(false);
        const [query, setQuery] = useState('');        
        const ref = useRef(null);

        useEffect(()=>{
            ['click', 'touched'].forEach(e => {
                document.addEventListener('click', toggle);
            })
            
            return () => ['click', 'touched'].forEach(e => {
                document.removeEventListener('click', toggle);            
            })
            
        }, []);

        function toggle(e){
            console.dir([e.target, ref.current])
            setOpen(e && e.target === ref.current)
        }
        function filter(guests){
            console.log(guests)
            return guests.filter((guest) =>                
                guest.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            
            )
        }
        function displayValue(){
            if(query.length > 0) return query;
            if(value) return value.name;
            return "";
        }
        function selectGuest(guest){
            setQuery("");
            onChange(guest); 
            setOpen(false);
        }

        return (
   
            <div className="dropdown">
                <div className="control" >
                <div className="selected-value" >                    
                    <input type="text" ref={ref} 
                    placeholder={value ? value.name : prompt} 
                    value={displayValue()} 
                    onChange={e => {
                        setOpen(true)
                        setQuery(e.target.value);
                        onChange(null)
                    }} 
                   
                    onClick={toggle}
                    onTouchEnd={toggle}></input>
                     <div onClick={()=>onChange(null)} className="clear-filter-btn">x</div>
                </div>
                    <div className={`arrow ${open ? "open" : null}`}></div>
                </div>
                <div className={`options ${open ? "open" : null}`}>
                    {
                        filter(guests).map(guest => 
                        <div 
                            key={guest.id} 
                            className={`option ${value === guest ? "selected" : null}` } 
                            onClick={() => selectGuest(guest)}
                            onTouchEnd={() => selectGuest(guest)}>
                                {guest.name}
                        </div>)
                    }
                </div>
            </div>
        )
   
}
