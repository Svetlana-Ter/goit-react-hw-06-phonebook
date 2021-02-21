import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Contact from '../Contact/Contact';
import styles from './ContactsList.module.css';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';

function ContactsList({ contacts = [], onDeleteContact }) {
  return (
    <TransitionGroup className={styles.contactsList} component='ul'>
      {contacts.map(contact => (
        <CSSTransition key={contact.id} timeout={250} classNames={styles}>
          <Contact contact={contact} onDeleteContact={onDeleteContact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

const getFilteredContacts = (filter, contacts) => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
};

const mapStateToProps = ({ contacts: { filter, items } }) => ({
  contacts: getFilteredContacts(filter, items),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
