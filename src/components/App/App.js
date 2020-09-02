import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter';
import ContactList from "../ContactList/ContactList";
import shortid from 'shortid';
import styles from './app.module.css';
import Notification from '../Notification/Notification';
import slideFromRightTransition from '../../transitions/slideFromRight.module.css';
import slideFromLeftTransition from '../../transitions/slideFromLeft.module.css';
import contactsTransition from '../../transitions/contacts.module.css';

const filterContacts = (contacts, filter) =>
  contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

class App extends Component {
    state = {
      contacts: [],
      filter: '',
      message: '',
      showMessage: false,
    }

    componentDidMount(){
      if (localStorage.getItem("contacts")) {
        this.setState ( prevState => ({
          contacts: [...JSON.parse(localStorage.getItem("contacts"))]          
        }
      ))}
    };

    componentDidUpdate(prevProps, prevState){
      if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
      }
    };
  
  changeFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };
  
  onSubmitData = (data) => {
    const { contacts } = this.state;

    const addContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (contacts.find(contact => contact.name === addContact.name)) {
      // alert(`${addContact.name} is already in contacts!`);
      this.setState({showMessage: true, message: 'Contact already exists!'})
      setTimeout(() => {
        this.setState({showMessage: false});
      }, 2000);
      return;
    }

    this.setState({
      contacts: [...contacts, addContact],
    });
  };

  render () {
    const { contacts, filter, message, showMessage }= this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <>
      <div className="container">
        <CSSTransition
          in
          appear
          timeout={200}
          classNames={slideFromLeftTransition }
        >
            <h1 className={styles["logo-txt"]}>Phonebook</h1>
        </CSSTransition>
        <CSSTransition 
          in={showMessage} 
          timeout={200} 
          classNames={slideFromRightTransition} 
          unmountOnExit
          >
            <Notification message={message} />
        </CSSTransition>
        
        <ContactForm onSubmitData={this.onSubmitData} /> 

        <CSSTransition
          in={contacts.length > 1}
          timeout={200}
          classNames={contactsTransition}
          unmountOnExit
        >
            <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <ContactList 
          contacts={filteredContacts} 
          onDeleteContact={this.onDeleteContact} 
        />
        {/* {contacts.length !==0 && (
          <>
            <h2>Contacts</h2>
            {contacts.length > 1 && (
              <Filter value={filter} onChangeFilter={this.changeFilter} />
            )}
            <ContactList contacts={filteredContacts} onDeleteContact={this.onDeleteContact} />
          </>
        )} */}
      </div>  
      </>
    );
  }
};

export default App;
