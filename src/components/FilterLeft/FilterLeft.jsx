import style from './FilterLeft.module.css';

export default function FilterLeft() {
  return (
    <div className={style.filter_left}>
      <span className={style.filter_title}>Количество пересадок</span>
      <div className={style.filter_list}>
        <label className={style.filter_label} htmlFor="all">
          <input className={style.filter_input} id="all" type="checkbox" />
          <span className={style.filter_checkbox} />
          <span>Все</span>
        </label>
        <label className={style.filter_label} htmlFor="without_transfers">
          <input className={style.filter_input} id="without_transfers" type="checkbox" />
          <span className={style.filter_checkbox} />
          <span>Без пересадок</span>
        </label>
        <label className={style.filter_label} htmlFor="one_transfer">
          <input className={style.filter_input} id="one_transfer" type="checkbox" />
          <span className={style.filter_checkbox} />
          <span>1 пересадка</span>
        </label>
        <label className={style.filter_label} htmlFor="two_transfers">
          <input className={style.filter_input} id="two_transfers" type="checkbox" />
          <span className={style.filter_checkbox} />
          <span>2 пересадки</span>
        </label>
        <label className={style.filter_label} htmlFor="three_transfers">
          <input className={style.filter_input} id="three_transfers" type="checkbox" />
          <span className={style.filter_checkbox} />
          <span>3 пересадки</span>
        </label>
      </div>
    </div>
  );
}
