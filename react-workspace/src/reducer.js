function counter(state = { request: '' }, action) {
    switch (action.type) {
      case 'SEND_REQUEST':
        return { request: 'запрос' }
      default:
        return state
    }
  }

export default counter;