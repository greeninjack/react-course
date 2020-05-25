import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
// import Radium from 'radium';
import Person from './Person/Person';

// You write normal CSS, because is will be implemented as such by styled-components
const StyledButton = styled.button`
background-color: ${props => props.alt ? 'red' : 'green'};
color: white;
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor: pointer;

&:hover {
  background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
  color: black;
}
`;
// &:hover & this will tell the style components package that this belongs to this button which is spread out and that there it should apply it hover style.

class App extends Component {
  state = {
    persons: [
      { id: 'sdasd', name: 'Max', age: 28 },
      { id: 'dfdas', name: 'Manu', age: 29 },
      { id: 'fhjda', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }


  nameChangedHandler = (event, id) => {
    //So we need to find that person, the single person and we can do this by reaching out to the state, to the persons there and by calling find
    //const person = this.state.persons.find();
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    //We can also use findIndex() to find the element in an array but then get the index of that element
    const person = {
      ...this.state.persons[personIndex]
    }; // to get the person from the index

    //Another option to reassign the object (so you make a copy of it) is:
    //const person = Object.assign({}, this.state.persons[personIndex]);

    //now you are not manipulating the original person
    person.name = event.target.value;

    //update the array at this position I fetched on personIndex:
    const persons = [...this.state.persons];
    persons[personIndex] = person; //person index should now be my updated person here

    //this finally allows us to set the state here and set it to this updated persons array which is a copy of the old array where we updated one element with the updated person where we adjusted the name.
    this.setState({
      persons: persons
      //persons: [
      // { name: 'Max', age: 28 },
      // { name: event.target.value, age: 29 },
      // { name: 'Stephanie', age: 26 }
      //]
    });
  }
  //we set the state of the persons to the new persons, the updated persons and this approach has a flaw. The flaw of this approach is that in javascript, objects and arrays are reference types,
  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })

  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const style = {
      // backgroundColor: 'green',
      // color: 'white',
      // font: 'inherit',
      // border: '1px solid blue',
      // padding: '8px',
      // cursor: 'pointer'
      //you need to wrap them in quotation marks though because since they start with a colon, they are not valid javascript property names, as strings as they are though.
      //':hover': {
      //   backgroundColor: 'lightgreen',
      //   color: 'black',
      // }
    };

    let persons = null;
    //You can do if where because you are inside the JS, not JSX
    //If true red background 
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}// You should assign something unique, would generally be an id from the DB
              changed={(event) => this.nameChangedHandler(event, person.id)}// this overall function is the one which gets executed upon the onChange event.
            />
          })}
        </div>
      );
      //change to red if this.state.showPersons is true
      style.backgroundColor = 'red';
    }

    //let classes = ['red', 'bold'].join(''); // 'red bold
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red ');//class = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); // class = ['red','bold']
    }


    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join('')}>This is really working!</p>
        {/* <button ...> */}
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          {/* style={style} */}
            Toggle Persons
        </StyledButton>
        {/* </button> */}
        {persons}
      </div>
    );
  }
}
export default App;
// export default Radium(App);
