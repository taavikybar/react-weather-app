
/* Actions concerning location data */

import axios from 'axios'
import { geoIpApi } from '../config'

export function fetchLocation(handler) {
	return dispatch => dispatch({
		type: 'FETCH_LOCATION',
		payload: axios.get(geoIpApi.url)
	}).catch(error => {
		dispatch({
			type: 'FETCH_LOCATION_ERROR',
			payload: error
		})
	}).then(handler)
}