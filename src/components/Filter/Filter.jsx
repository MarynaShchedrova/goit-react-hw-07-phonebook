import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/contactsSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <label className={css.filterLabel}>
      <input
        className={css.filterName}
        type="text"
        name="filter"
        value={filter}
        onChange={e => dispatch(setFilter(e.target.value))}
        placeholder="Find contacts by name"
      />
    </label>
  );
};
