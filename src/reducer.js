import { SET_FILTER_TRANSFER, filtersTransferNames } from './actions'

const initialState = {
  all: false,
  noTransfer: false,
  oneTransfer: false,
  twoTransfer: false,
  threeTransfer: false,
}

const filterTransferReducer = (state = initialState, action = { type: null }) => {
  if (action.type === SET_FILTER_TRANSFER) {
    const { filterName, value } = action.payload // eslint-disable-line
    if (filterName === filtersTransferNames.all && value === true) {
      return {
        all: true,
        noTransfer: true,
        oneTransfer: true,
        twoTransfer: true,
        threeTransfer: true,
      }
    }
    if (filterName === filtersTransferNames.all && value === false) {
      return {
        all: false,
        noTransfer: false,
        oneTransfer: false,
        twoTransfer: false,
        threeTransfer: false,
      }
    }
    if (state.all === true && value === false) {
      return { ...state, all: false, [filterName]: false }
    }
    if (state.noTransfer + state.oneTransfer + state.twoTransfer + state.threeTransfer === 3 && value === true) {
      return {
        all: true,
        noTransfer: true,
        oneTransfer: true,
        twoTransfer: true,
        threeTransfer: true,
      }
    }
    return { ...state, [filterName]: value }
  }
  return state
}

export default filterTransferReducer
