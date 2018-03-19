import { combineReducers } from 'redux'

import weather from './weather'
import forecasts from './forecasts'
import location from './location'
import units from './units'
import city from './city'

export default combineReducers({
	weather,
	forecasts,
	location,
	units,
	city
})