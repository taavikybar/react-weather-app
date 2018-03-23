<a name="Layout"></a>

## Layout ⇐ <code>React.Component</code>
**Kind**: global class  
**Extends**: <code>React.Component</code>  
**Export**: Layout  
<a name="new_Layout_new"></a>

### new Layout(city, location, units, weather, weatherFetched, forecasts, forecastsFetched, todaysForecasts, error, dispatch)
Main layout component that is hydrated with Redux store
and displays Navigation, Weather and Forecasts components
if city is selected or Search component if not with appropriate
callback functions.
Handles dispatching all the actions to Redux store.

PROPERTIES


| Param | Type | Description |
| --- | --- | --- |
| city | <code>string</code> | city to search weather for |
| location | <code>string</code> | name of the current location |
| units | <code>Object</code> | temperature units object |
| weather | <code>Object</code> | fetched weather object consisting  * of description, degrees and icon code |
| weatherFetched | <code>boolean</code> | if weather is fetched |
| forecasts | <code>Array</code> | collection of forecasts with day name and a collection of forecasts for the day |
| forecastsFetched | <code>boolean</code> | if forecasts are fetched |
| todaysForecasts | <code>Object</code> | an object containing forecasts for parts of the current day |
| error | <code>string</code> | error text if fetching returns an error |
| dispatch | <code>function</code> | function to call for dispatching action to Redux store |

