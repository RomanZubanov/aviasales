export const SET_FILTER_TRANSFER = 'SET_FILTER_TRANSFER'
export const SET_FILTER_TICKETS = 'SET_FILTER_TICKETS'

export const filtersTransferNames = {
  all: 'all',
  noTransfer: 'noTransfer',
  oneTransfer: 'oneTransfer',
  twoTransfer: 'twoTransfer',
  threeTransfer: 'threeTransfer',
}

export const filterTickets = {
  CHEAPEST: 'CHEAPEST',
  FASTEST: 'FASTEST',
  OPTIMAL: 'OPTIMAL',
}

export const setFilterTransfer = (filter) => ({
  type: SET_FILTER_TRANSFER,
  payload: filter,
})

export const setFilterTickets = (filter) => ({
  type: SET_FILTER_TICKETS,
  payload: filter,
})
