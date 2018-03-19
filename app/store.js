import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, reducers),
	middleware = applyMiddleware(promise(), thunk, createLogger())

export default () => {
	const store = createStore(persistedReducer, middleware),
		persistor = persistStore(store)

	return { store, persistor }
}