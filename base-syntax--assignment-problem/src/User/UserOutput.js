import React from 'react';
import './UserOutput.css';
const userOutput = ( props ) => {

    return (
        <div className='UserOutput'>
            <p>I'm {props.userName} and I am years old!</p>
            <p>{props.children}</p>
            
        </div>
    )
};

export default userOutput;