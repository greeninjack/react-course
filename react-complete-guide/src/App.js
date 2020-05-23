import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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


  nameChangedHandler = ( event, id ) => {
//So we need to find that person, the single person and we can do this by reaching out to the state, to the persons there and by calling find
//const person = this.state.persons.find();
const personIndex = this.state.persons.findIndex(p=> {
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
    this.setState( {persons: persons
      //persons: [
        // { name: 'Max', age: 28 },
        // { name: event.target.value, age: 29 },
        // { name: 'Stephanie', age: 26 }
      //]
    } );
  }
//we set the state of the persons to the new persons, the updated persons and this approach has a flaw. The flaw of this approach is that in javascript, objects and arrays are reference types,
  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})

  }
  
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    //You can do if where because you are inside the JS, not JSX
    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age ={person.age}
            key={person.id}// You should assign something unique, would generally be an id from the DB
            changed={(event) => this.nameChangedHandler(event,person.id)}// this overall function is the one which gets executed upon the onChange event.
            />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
