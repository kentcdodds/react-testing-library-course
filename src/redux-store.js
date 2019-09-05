import {createStore} from 'redux'
import {reducer} from './redux-reducer'

const store = createStore(reducer)

export {store}
