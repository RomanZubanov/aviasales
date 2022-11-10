import { createSlice } from '@reduxjs/toolkit'

export const filterTransferSlice = createSlice({
  name: 'filterTransfer',
  initialState: {
    all: true,
    noTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
    change: true,
  },
  reducers: {
    setAll: (state, action) => {
      if (action.payload) {
        return {
          all: true,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      return {
        all: false,
        noTransfer: false,
        oneTransfer: false,
        twoTransfer: false,
        threeTransfer: false,
        change: !state.change,
      }
    },
    setNoTransfer: (state, action) => {
      if (state.all === true && action.payload === false) {
        return {
          all: false,
          noTransfer: false,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      if (
        state.noTransfer + state.oneTransfer + state.twoTransfer + state.threeTransfer === 3 &&
        action.payload === true
      ) {
        return {
          all: true,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      return { ...state, noTransfer: action.payload }
    },
    setOneTransfer: (state, action) => {
      if (state.all === true && action.payload === false) {
        return {
          all: false,
          noTransfer: true,
          oneTransfer: false,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      if (
        state.noTransfer + state.oneTransfer + state.twoTransfer + state.threeTransfer === 3 &&
        action.payload === true
      ) {
        return {
          all: true,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      return { ...state, oneTransfer: action.payload }
    },
    setTwoTransfer: (state, action) => {
      if (state.all === true && action.payload === false) {
        return {
          all: false,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: false,
          threeTransfer: true,
          change: !state.change,
        }
      }
      if (
        state.noTransfer + state.oneTransfer + state.twoTransfer + state.threeTransfer === 3 &&
        action.payload === true
      ) {
        return {
          all: true,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      return { ...state, twoTransfer: action.payload }
    },
    setThreeTransfer: (state, action) => {
      if (state.all === true && action.payload === false) {
        return {
          all: false,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: false,
          change: !state.change,
        }
      }
      if (
        state.noTransfer + state.oneTransfer + state.twoTransfer + state.threeTransfer === 3 &&
        action.payload === true
      ) {
        return {
          all: true,
          noTransfer: true,
          oneTransfer: true,
          twoTransfer: true,
          threeTransfer: true,
          change: !state.change,
        }
      }
      return { ...state, threeTransfer: action.payload, change: !state.change }
    },
  },
})

export const { setAll, setNoTransfer, setOneTransfer, setTwoTransfer, setThreeTransfer } = filterTransferSlice.actions

export const selectFilterTransfer = (state) => state.filterTransfer

export default filterTransferSlice.reducer
