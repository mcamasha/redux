import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counter from './reducer'
import { Form } from './Form';
import {connect} from 'react-redux'

//переименовать counter
const store = createStore(counter)

//вынести в отдельный файл
const sendRequestAction = { type: 'SEND_REQUEST' }

// Map Redux state to component props
function mapStateToProps(state) {
    return {
      request: state.request
    }
  }
  
  // Map Redux actions to component props
  function mapDispatchToProps(dispatch) {
    return {
      onIncreaseClick: () => dispatch(sendRequestAction)
    }
  }
  
  // Connected Component
  const App = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form)
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )  