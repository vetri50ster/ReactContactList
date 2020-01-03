import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer,applyMiddleware(thunk))
  return store
}
