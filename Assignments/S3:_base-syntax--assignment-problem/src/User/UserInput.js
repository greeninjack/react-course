import React from 'react';

const userInput = ( props ) => {
    const style = {
        border: '2px solid red'
    };
    return (
        <div>
            <input onChange={props.input} value={props.currentName} type="text" style = {style}></input>
        </div>
    )
};


export default userInput;