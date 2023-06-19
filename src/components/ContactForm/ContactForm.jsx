import css from './ContactForm.module.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from '../../redux/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const contacts = useSelector(getContacts);

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name && phone) {
      if (contacts.find(el => el.name === name)) {
        return alert(`${name} is already in contacts`);
      }
      dispatch(addContact({ name, phone }));
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.formName}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        className={css.formName}
        type="tel"
        name="number"
        value={phone}
        onChange={handleChange}
        placeholder="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
