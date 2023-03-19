import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer from './product';
import { reviewsReducer } from './reviews';
import { cartReducer } from './cart';
import { orderReducer } from './order';
import { searchReducer } from './search';

const rootReducer = combineReducers({
  session,
  productsReducer,
  reviewsReducer,
  cartReducer,
  orderReducer,
  searchReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
