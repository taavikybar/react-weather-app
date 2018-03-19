export function parseDegrees(degrees, unit) {
	if (unit === 'F') {
		degrees = degrees * 9 / 5 + 32
	}

	return `${Math.floor(degrees)}°${unit}`
}

export function capitalize(string) {
	return `${string[0].toUpperCase()}${string.slice(1)}`
}