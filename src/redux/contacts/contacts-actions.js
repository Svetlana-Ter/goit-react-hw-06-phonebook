import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contact/add', data => ({
  payload: {
    id: shortid.generate(),
    name: data.name,
    number: data.number,
  },
}));

const deleteContact = createAction('contact/delete');

const changeFilter = createAction('contact/filterChange');

export default { addContact, deleteContact, changeFilter };
