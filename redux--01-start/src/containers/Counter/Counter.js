import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.counterChangedHandler('inc')} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler('dec')} />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler('add', 5)} />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler('sub', 5)} />
            </div>
        );
    }
}
//You store instructions about how the state managed by redux should be mapped to props you can use in this container
const mapStateToProps = state => {//this state here again, will be given to you by react-redux which of course will reach out to your redux state which of course in turn is the state you set up in reducer.js that has a counter property
    return {
        ctr: state.counter
    }
}

export default connect(mapStateToProps)(Counter);