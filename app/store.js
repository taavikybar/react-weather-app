/* eslint-env node */

import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const env = process.env.NODE_ENV,
	persistConfig = {
		key: 'root',
		storage,
	}

let middlewares = [promise(), thunk]

if (env === 'development') {
	middlewares = [...middlewares, createLogger()]
}

const persistedReducer = persistReducer(persistConfig, reducers),
	middleware = applyMiddleware(...middlewares)

export default () => {
	const store = createStore(persistedReducer, middleware),
		persistor = persistStore(store)

	return { store, persistor }
}