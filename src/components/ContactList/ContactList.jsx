import css from './ContactList.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContacts,
  getError,
  getFilter,
  getIsLoading,
  deleteContact,
  fetchContacts,
} from '../../redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      <ul>
        {filteredContacts.map(({ name, phone, id }) => {
          return (
            <li key={id}>
              <div>
                <h3>{name}:</h3>
                <p>{phone}</p>
              </div>
              <button
                class={css.contactListItemBtn}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                {isLoading ? '...' : 'Delete'}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
