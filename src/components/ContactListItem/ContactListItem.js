import React from 'react';
import PropTypes from 'prop-types';
import styles from './contactListItem.module.css';

const ContactListItem = ({ contact, onDeleteContact })=> (
    <div className={`${styles.contactElement} container shadow`}> 
        <div className={styles.contactContainer}>
            <span>{contact.name}</span>
            <span>{contact.number}</span>
        </div>
        <button 
        onClick= {()=>onDeleteContact(contact.id)}
        type="button"
        className={styles.deleteBtn}
        >
        X
        </button>
    </div>
)


ContactListItem.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired,
    ),
    onDeleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;

