import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'

import { setCheapest, setFastest, setOptimal, selectFilterTickets } from './filterTicketsSlice'
import style from './FilterTickets.module.css'

export default function FilterTickets() {
  const filterTickets = useSelector(selectFilterTickets)
  const dispatch = useDispatch()

  return (
    <div className={classNames(style.top_filter, style[filterTickets])}>
      <label htmlFor="cheapest">
        <input id="cheapest" type="radio" name="TopFilter" value="cheapest" onClick={() => dispatch(setCheapest())} />
        <span>Самый дешевый</span>
      </label>
      <label htmlFor="fastest">
        <input id="fastest" type="radio" name="TopFilter" value="fastest" onClick={() => dispatch(setFastest())} />
        <span>Самый быстрый</span>
      </label>
      <label htmlFor="optimal">
        <input id="optimal" type="radio" name="TopFilter" value="optimal" onClick={() => dispatch(setOptimal())} />
        <span>Оптимальный</span>
      </label>
    </div>
  )
}
