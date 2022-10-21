import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import filterTransferReducer from './reducer'
import App from './components/App'
import 'antd/dist/antd.min.css'
import 'normalize.css'

const store = createStore(
  filterTransferReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
)

function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Wrapper />)
