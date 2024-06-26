# Found issues

The API seems to lack decent error handling, for example:
- When Searching for a collection detail with an incorrect identifier (nl-SK-C-5) instead of (SK-C-5) an error is thrown by the API that isn't parsable as JSON. Even when explicitly requesting a JSON response. This is due to the server throwing a 500 internal server error. It would've been more consumer friendly if a 404 not found was thrown with a decent error message.