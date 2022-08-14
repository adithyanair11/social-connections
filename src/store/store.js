import {compose,legacy_createStore as createStore,applyMiddleware} from 'redux'
import { rootReducer } from './root-reducer';
import {logger} from 'redux-logger';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));


export const store = createStore(persistedReducer,undefined,composedEnhancers);

export const persistor = persistStore(store);