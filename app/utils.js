/**
 * Function converts temperature from Celsius to Fahrenheit
 * and formats the return string
 * @param {Number} degrees - degrees in Celsius or Fahrenheit
 * @param {String} unit - unit of the degrees
 * @returns {String} - formatted temperature string
 */
export function parseDegrees(degrees, unit) {
	if (unit === 'F') {
		degrees = degrees * 9 / 5 + 32
	}

	return `${Math.floor(degrees)}°${unit}`
}

/**
 * Function capitalizes the first character of a string
 * @param {String} string - string to capitalize
 * @returns {String} - capitalized string
 */
export function capitalize(string) {
	return `${string[0].toUpperCase()}${string.slice(1)}`
}