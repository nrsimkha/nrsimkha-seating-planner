import 'whatwg-fetch';

const XPress = {};
const baseUrl = 'http://localhost:4000/api';

XPress.getGuests = () => {
  const url = `${baseUrl}/bookings/`;

  return fetch(url, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }).then((response)=>{
      if(response.ok){
        
        return response.json();
      }
      //throw new Error('Request failed!');
    }, (networkError)=>{
      console.log(networkError.message);
    }).then((jsonResponse)=>{
      return jsonResponse;
  })
  
};
XPress.addGuest = guest => {
  console.log(JSON.stringify({guest}));
  const url = `${baseUrl}/bookings`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({guest})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    
    return response.json();
  });
};

export default XPress;