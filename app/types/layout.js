import PropTypes from 'prop-types'

export default {
	city: PropTypes.string,
	location: PropTypes.string,
	units: PropTypes.object,
	weather: PropTypes.object,
	weatherFetched: PropTypes.bool,
	forecasts: PropTypes.array,
	forecastsFetched: PropTypes.bool,
	todaysForecasts: PropTypes.object,
	error: PropTypes.string,
	dispatch: PropTypes.func
}