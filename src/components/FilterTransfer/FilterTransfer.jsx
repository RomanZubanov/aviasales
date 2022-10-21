import { connect } from 'react-redux'

import { setFilterTransfer, filtersTransferNames } from '../../actions'

import style from './FilterLeft.module.css'

function FilterTransfer({ filters, dispatch }) {
  return (
    <div className={style.filter_left}>
      <span className={style.filter_title}>Количество пересадок</span>
      <div className={style.filter_list}>
        <label className={style.filter_label} htmlFor="all">
          <input
            className={style.filter_input}
            onChange={(e) =>
              dispatch(setFilterTransfer({ filterName: filtersTransferNames.all, value: e.target.checked }))
            }
            checked={filters.all}
            id="all"
            type="checkbox"
          />
          <span className={style.filter_checkbox} />
          <span>Все</span>
        </label>
        <label className={style.filter_label} htmlFor="without_transfers">
          <input
            className={style.filter_input}
            onChange={(e) =>
              dispatch(setFilterTransfer({ filterName: filtersTransferNames.noTransfer, value: e.target.checked }))
            }
            checked={filters.noTransfer}
            id="without_transfers"
            type="checkbox"
          />
          <span className={style.filter_checkbox} />
          <span>Без пересадок</span>
        </label>
        <label className={style.filter_label} htmlFor="one_transfer">
          <input
            className={style.filter_input}
            onChange={(e) =>
              dispatch(setFilterTransfer({ filterName: filtersTransferNames.oneTransfer, value: e.target.checked }))
            }
            checked={filters.oneTransfer}
            id="one_transfer"
            type="checkbox"
          />
          <span className={style.filter_checkbox} />
          <span>1 пересадка</span>
        </label>
        <label className={style.filter_label} htmlFor="two_transfers">
          <input
            className={style.filter_input}
            onChange={(e) =>
              dispatch(setFilterTransfer({ filterName: filtersTransferNames.twoTransfer, value: e.target.checked }))
            }
            checked={filters.twoTransfer}
            id="two_transfers"
            type="checkbox"
          />
          <span className={style.filter_checkbox} />
          <span>2 пересадки</span>
        </label>
        <label className={style.filter_label} htmlFor="three_transfers">
          <input
            className={style.filter_input}
            onChange={(e) =>
              dispatch(setFilterTransfer({ filterName: filtersTransferNames.threeTransfer, value: e.target.checked }))
            }
            checked={filters.threeTransfer}
            id="three_transfers"
            type="checkbox"
          />
          <span className={style.filter_checkbox} />
          <span>3 пересадки</span>
        </label>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ filters: state })

export default connect(mapStateToProps)(FilterTransfer)
