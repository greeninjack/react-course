import React from 'react'

const char = (props) => {
    const style = {
        display: 'inline-block',
        padding: '16px',
        margin: '16px',
        border: '1px solid black',
        textAlign: 'center',

    }
    let validationMessage = 'Text long enough';
    if (props.inputLength <= 5) {
        validationMessage = 'Text too short';
    }
    return (
        <div style={style}
                onClick={props.clicked}
        >
            {props.character}

            {/* {
            props.inputLength > 5 ?
    <p>Text long enough</p> :
    <p>Text too short </p>
        } */}
            <p>{validationMessage}</p>
        </div>

    );
}



export default char;