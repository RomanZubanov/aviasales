import { useState } from 'react';
import classNames from 'classnames';

import style from './FilterTop.module.css';

export default function FilterTop() {
  const [filterValue, setFilterValue] = useState('cheapest');

  const onSelect = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className={classNames(style.top_filter, style[filterValue])}>
      <label htmlFor="cheapest">
        <input id="cheapest" type="radio" name="TopFilter" value="cheapest" onClick={onSelect} />
        <span>Самый дешевый</span>
      </label>
      <label htmlFor="fastest">
        <input id="fastest" type="radio" name="TopFilter" value="fastest" onClick={onSelect} />
        <span>Самый быстрый</span>
      </label>
      <label htmlFor="optimal">
        <input id="optimal" type="radio" name="TopFilter" value="optimal" onClick={onSelect} />
        <span>Оптимальный</span>
      </label>
    </div>
  );
}
