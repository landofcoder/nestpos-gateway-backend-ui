import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import {Iterable} from 'immutable';

export const history = createHistory();
// history.listen(location => console.log('location back click:', location));

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = [];
middleWares.push(sagaMiddleware);

if (process.env.NODE_ENV === `development`) {
    const {createLogger} = require(`redux-logger`);
    const logger = createLogger({
        stateTransformer: (state) => {
            const newState = {};
            const stateObj = state.toObject();

            for (const i of Object.keys(stateObj)) {
                if (Iterable.isIterable(stateObj[i])) {
                    newState[i] = stateObj[i].toJS();
                } else {
                    newState[i] = stateObj[i];
                }
            }

            return newState;
        }
    });
    middleWares.push(logger);
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWares))
);

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
