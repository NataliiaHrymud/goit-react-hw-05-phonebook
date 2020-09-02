import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contactForm.module.css'

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.number) {
            return;
          }
        this.props.onSubmitData ({ ...this.state });
        this.reset();
    }
    reset () {
        this.setState({
            name: '',
            number: '',
        });
    }

    render() {
        const { name, number } = this.state;
        return (
              <form 
              onSubmit={this.handleSubmit}
              className={`${styles.form} container shadow`}
              >
                <label htmlFor="name">
                    Name
                    <input 
                        type="text" 
                        value={name}
                        name="name"
                        required
                        onChange={this.handleChange} 
                    />
                </label>
                <label htmlFor="number">
                    Number
                    <input 
                        type="text" 
                        name="number" 
                        value={number}
                        required
                        onChange={this.handleChange} 
                    />
                </label>
                <button type="submit"> Add new contact </button>
            </form>
        );        
    }
}

ContactForm.propTypes = {
    onSubmitData: PropTypes.func.isRequired,
}

export default ContactForm;