import React from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form/Form';
import ContactsList from './components/ContactsList/ContactsList';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';
import { CSSTransition } from 'react-transition-group';
import Logo from './components/Logo/Logo';
import Error from './components/Error/Error';
import { connect } from 'react-redux';

class App extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  };

  state = {
    message: '',
  };

  handleSubmit = message => {
    this.setState({ message });
  };

  render() {
    const { message } = this.state;
    const { contacts } = this.props;
    return (
      <>
        <CSSTransition
          in={message}
          timeout={250}
          classNames={{
            enter: styles.errorEnter,
            enterActive: styles.errorEnterActive,
            exit: styles.errorExit,
            exitActive: styles.errorExitActive,
          }}
          unmountOnExit
        >
          <Error message={message} />
        </CSSTransition>

        <CSSTransition in={true} appear={true} timeout={500} classNames={styles} unmountOnExit>
          <Logo />
        </CSSTransition>

        <Form messageSubmit={this.handleSubmit} />

        <CSSTransition in={contacts.length > 0} timeout={250} classNames={styles} unmountOnExit>
          <h2 className={styles.subtitle}>Contacts</h2>
        </CSSTransition>

        <CSSTransition in={contacts.length > 1} timeout={250} classNames={styles} unmountOnExit>
          <Filter />
        </CSSTransition>

        <ContactsList />
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

export default connect(mapStateToProps)(App);
