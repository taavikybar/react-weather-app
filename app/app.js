/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'

/* Import Scss entry */
import './scss/app.scss'

/* Main layout */
import Layout from './components/Layout'

const { persistor, store } = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<PersistGate  persistor={persistor}>
			<Layout />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
)