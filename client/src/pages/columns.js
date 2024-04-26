import React, { useEffect, useState } from 'react'

function columns() {
    const [data,setData] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send the form data to the backend using fetch API
            const response = await fetch('http://localhost:5000/get_data_columns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            // Handle the response from the backend
            if (response.ok) {
            const dataI = await response.json();
            setData(dataI)
            console.log('Prediction result:', dataI);
            // Do something with the prediction result
            } else {
            console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div>
        <div>
            <button className='btn btn-primary' onClick={(e)=>handleSubmit(e)}>
                Click Me
            </button>
            </div>
        <p>{data}</p>
        </div>
  )
}

export default columns