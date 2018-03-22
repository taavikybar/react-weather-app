import PropTypes from 'prop-types'

export default {
	city: PropTypes.string,
	location: PropTypes.string,
	locationError: PropTypes.string,
	units: PropTypes.string,
	weather: PropTypes.object,
	weatherFetched: PropTypes.bool,
	weatherError: PropTypes.any,
	forecasts: PropTypes.array,
	forecastsFetched: PropTypes.bool,
	forecastsError: PropTypes.any,
	todaysForecasts: PropTypes.object,
	dispatch: PropTypes.func
}