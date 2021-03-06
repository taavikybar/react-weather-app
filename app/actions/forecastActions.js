/* Actions concerning forecasts weather data */

import axios from 'axios'
import { weatherApi } from '../config'

export function fetchForecast(city) {
	return dispatch => dispatch({
		type: 'FETCH_FORECAST',
		payload: axios.get(`${weatherApi.url}forecast?q=${city}&appid=${weatherApi.key}${weatherApi.options}`)
	}).catch(error => {
		dispatch({
			type: 'FETCH_FORECAST_ERROR',
			payload: error
		})
	})
}