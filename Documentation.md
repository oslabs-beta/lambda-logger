## Lambda Logger Documentation
---

### Overview

Lambda Logger is a web application designed to facilitate the management and monitoring of AWS Lambda function logs through Amazon CloudWatch. The application is built using React for the front end and a Node.js Express backend. The frontend uses React Router for navigation, allowing users to navigate between different views seamlessly.

---
### Components

#### `App`

- The main component that serves as the entry point for the Lambda Logger application.
- Uses React Router (`BrowserRouter`, `Routes`, and `Route`) to define routes for different views in the app.
- Manages the application state for user credentials and interacts with custom hooks for fetching log groups, log streams, and logs.
- Renders the `Header`, `Splash`, `Credentials`, `ConsoleNav`, and `Console` components based on the defined routes.

#### `Header`

- Displays the application header with the Lambda Logger logo and navigation links.
- Navigation links include Home, Docs, Github, and the main application page (Credentials).

#### `Splash`

- Represents the splash or landing page of the Lambda Logger application.
- Rendered when the root URL (`/`) is accessed.

#### `Credentials`

- Manages the user's AWS credentials (Access Key, Secret Key, and Region) and handles the authentication process.
- Utilizes custom hooks (`useLogGroups`, `useLogStreams`, `useLogs`, `useThemeButton`, and `useSearch`) to fetch and manage data related to log groups, log streams, logs, themes, and search functionality.
- Renders the `CredentialsForm` component for entering AWS credentials.

#### `CredentialsForm`

- A form component used for entering AWS credentials (Access Key, Secret Key, and Region).
- Dynamically updates the region dropdown based on the available AWS regions.
- Displays loading indicators during data fetching.

#### `ConsoleNav`

- Provides navigation and control options for the Console view.
- Allows users to select log groups, log streams, switch themes, perform searches, and fetch the latest logs.
- Uses custom hooks (`useLogGroupOptions`, `useLogStreamOptions`, `useSelectStream`, and `useSelectGroup`) to manage options and selections for log groups and log streams.

#### `Console`

- Displays logs using syntax highlighting.
- Takes a `jsonString` prop and a `theme` prop for rendering JSON logs with the specified theme.

---


### Custom Hooks

- `useLogGroups`: Manages API calls for fetching log groups and related state.
- `useLogStreams`: Manages API calls for fetching log streams and related state.
- `useLogs`: Manages API calls for fetching logs and related state.
- `useThemeButton`: Manages theme toggling in React components.
- `useSearch`: Manages search functionality and querying logs.

---


### Routing

- The React Router library is used for client-side routing.
- Different views are defined for the root (`/`), credentials (`/credentials`), and console (`/console`).

---


### Styles

- Styling is implemented using CSS modules for local scoping of styles.
- Stylesheets are imported into components for styling.

---


### Using the App

1. Start the application by running the appropriate scripts (e.g., `npm start` if in production or `npm run dev` if contributing).
2. Navigate to different views using the navigation links.
3. Enter AWS credentials on the Credentials screen.
4. Explore logs using the Console view.

---


### Contributing

Contributions to the Lambda Logger project are welcome. Please follow the guidelines outlined in the project's documentation and make sure to adhere to coding standards.

---

## Custom Hooks

### `useLogGroupOptions`

This custom hook is responsible for creating options for a dropdown menu based on an array of log groups.

##### Usage:

`const { logGroupOptions } = useLogGroupOptions(logGroups);`

##### Parameters:

- `logGroups`: An array of log groups retrieved from AWS CloudWatch.

##### Returns:

- `logGroupOptions`: An array of React `<option>` elements for each log group.

---
### `useLogGroups`

This custom hook manages the state and API calls related to fetching log groups.

##### Usage:

```
const {   
	logGroups,
	selectedLogGroup,
	setSelectedLogGroup,
	fetchLogGroups,
	emptyRegion,
	isLoading, 
} = useLogGroups(accessKey, secretKey, region, setAuthenticated);
```

##### Parameters:

- `accessKey`: AWS Access Key.
- `secretKey`: AWS Secret Key.
- `region`: AWS Region.
- `setAuthenticated`: Function to set the authentication status.

##### Returns:

- `logGroups`: Array of log groups.
- `selectedLogGroup`: Currently selected log group.
- `setSelectedLogGroup`: Function to set the selected log group.
- `fetchLogGroups`: Function to fetch log groups.
- `emptyRegion`: Boolean indicating if the region is empty.
- `isLoading`: Boolean indicating if data is currently being fetched.

---
### `useLogs`

This custom hook manages the state and API calls related to fetching logs.

##### Usage:

```
const { 
	logs, 
	fetchLogs, 
	setLogs 
} = useLogs(accessKey, secretKey, region, selectedLogGroup, selectedLogStream);
````

##### Parameters:

- `accessKey`: AWS Access Key.
- `secretKey`: AWS Secret Key.
- `region`: AWS Region.
- `selectedLogGroup`: Currently selected log group.
- `selectedLogStream`: Currently selected log stream.

##### Returns:

- `logs`: Fetched logs.
- `fetchLogs`: Function to fetch logs.
- `setLogs`: Function to set logs.

---

### `useLogStreamOptions`

This custom hook is responsible for creating options for a dropdown menu based on an array of log streams.

##### Usage:

`const { logStreamOptions } = useLogStreamOptions(logStreams);`

##### Parameters:

- `logStreams`: An array of log streams retrieved from AWS CloudWatch.

##### Returns:

- `logStreamOptions`: An array of React `<option>` elements for each log stream.

---

### `useLogStreams`

This custom hook manages the state and API calls related to fetching log streams.

##### Usage:

```
const { 
	logStreams, 
	selectedLogStream, 
	setSelectedLogStream, 
	fetchLogStreams 
} = useLogStreams(accessKey, secretKey, region, selectedLogGroup);`
```
##### Parameters:

- `accessKey`: AWS Access Key.
- `secretKey`: AWS Secret Key.
- `region`: AWS Region.
- `selectedLogGroup`: Currently selected log group.

##### Returns:

- `logStreams`: Array of log streams.
- `selectedLogStream`: Currently selected log stream.
- `setSelectedLogStream`: Function to set the selected log stream.
- `fetchLogStreams`: Function to fetch log streams.

---

### `useRegions`

This custom hook provides options for AWS regions.

##### Usage:

`const { regionOptions } = useRegions();`

##### Returns:

- `regionOptions`: An array of React `<option>` elements for each AWS region.

---

### `useSearch`

This custom hook manages state and functionality related to searching logs.

##### Usage:

```
const { 
	jsonString, 
	searchQuery, 
	setSearchQuery, 
	handleSearchChange 
} = useSearch(jsonObject);
````

##### Parameters:

- `jsonObject`: Array of JSON objects representing logs.

##### Returns:

- `jsonString`: Stringified JSON after applying the search filter.
- `searchQuery`: Current search query.
- `setSearchQuery`: Function to set the search query.
- `handleSearchChange`: Function to handle changes in the search input.

---

### `useSelectGroup`

This custom hook handles changes in the selected log group.

##### Usage:

`const { handleSelectChange } = useSelectGroup(setSelectedLogGroup);`

##### Parameters:

- `setSelectedLogGroup`: Function to set the selected log group.

##### Returns:

- `handleSelectChange`: Function to handle changes in the selected log group.

---

### `useSelectStream`

This custom hook handles changes in the selected log stream.

##### Usage:

`const { handleSelectStreamChange } = useSelectStream(setSelectedLogStream);`

##### Parameters:

- `setSelectedLogStream`: Function to set the selected log stream.

##### Returns:

- `handleSelectStreamChange`: Function to handle changes in the selected log stream.

---

### `useThemeButton`

This custom hook manages the theme toggling functionality.

##### Usage:

```
const { 
	theme,
	setTheme, 
	themeButton, 
	setThemeButton, 
	handleThemeButtonClick
} = useThemeButton();
````

##### Returns:

- `theme`: Current theme.
- `setTheme`: Function to set the theme.
- `themeButton`: Text representing the current theme (e.g., "Light Mode").

---


## Flow of Interaction:

1. **Credentials Input:**
    
    - User enters AWS credentials (access key, secret key, region) in the `Credentials` component.
    - `useLogGroups` custom hook is called to fetch log groups based on the entered credentials.
    
2. **Console Navigation:**
    
    - User navigates to the `Console` view via the `ConsoleNav` component.
    - `useLogGroupOptions` and `useLogStreamOptions` custom hooks are used to fetch and generate log group and log stream options.
    
3. **Log Fetching:**
    
    - User selects a log group and log stream in the `ConsoleNav` component.
    - `useLogs` and `useLogStreams` custom hooks are used to fetch logs and log streams based on user selections.
    
4. **Theme Toggling:**
    
    - User clicks the theme toggle button in the `Console` component.
    - `useThemeButton` custom hook handles the theme toggling functionality.
    
5. **Search Functionality:**
    
    - User enters a search query in the `ConsoleNav` component.
    - `useSearch` custom hook filters logs based on the search query.

This integrated use of components and custom hooks allows for a modular and maintainable structure. Each custom hook serves a specific purpose, and components can easily leverage these hooks for state management, data fetching, and functionality.

---

## Node.js & Express Backend


### `logController.js`
The main middleware that interacts with AWS lives here and contains the following middleware functions:

#### `fetchLogGroups`

- Uses the AWS SDK to describe log groups. `describeLogGroups` is a built-in method on the `AWS.CloudWatchLogs` constructor.
- Filters log groups to include only those starting with "/aws/lambda".
- Passes the filtered log groups to the next middleware.

#### `fetchLogStreams`

- Describes log streams for a given log group.
- Passes the log streams to the next middleware.

#### `fetchLogs`

- Filters log events based on the selected log group and log stream.
- Parses log entries using various formats.
- Passes the parsed log entries to the next middleware.

---

### `configureAWS.js`
All AWS requests funnel through this special middleware function, which does the following:

- Configures the AWS SDK with credentials from headers (access-key, secret-key, aws-region).
- Passes the configured AWS object to the next middleware.

---

## Route Endpoints

### `logRoutes.js`

- Uses the `configureAWS` middleware to set up AWS configuration.
- Defines routes for fetching logs, log groups, and log streams.
- Uses the corresponding functions from `logController` to handle these requests.

---

## Main Server File

### `server.js`

- Configures the Express server.
- Serves the React build files from the `/build` directory.
- Defines routes using the `logRoutes` middleware.
- Handles 404 errors and provides a global error handler.
- Starts the server on the specified port (default is 3000).

---


### Key Interactions:

1. **Middleware Chain:**
    
    - `configureAWS` middleware configures AWS and passes the configured AWS object to subsequent middlewares.
    - `logController` functions fetch log groups, log streams, and logs, and pass the results to the next middleware.
    
2. **Routes:**
    
    - `/logs`, `/loggroups`, `/logstreams` routes in `logRoutes` handle requests for logs, log groups, and log streams.
    - They use corresponding functions from `logController` to fetch and respond with the requested data.
    
3. **React Integration:**
    
    - Serves the React build files statically.
    - React frontend communicates with these routes to fetch logs, log groups, and log streams.
    
4. **Error Handling:**
    
    - Global error handler in `server.js` catches and responds to errors, returning an error message and status code.


This backend setup provides endpoints for the frontend to interact with AWS services, fetching log-related information based on user requests. The error handling ensures that any issues are appropriately handled and reported to the client.

---

## Custom Parsing

The `fetchLogs` function in your `logController.js` file is responsible for fetching log events, filtering them based on the selected log group and log stream, and parsing the log entries. Let's dive deeper into the parsing logic:

### Parsing Logic:

The function uses the `filterLogEvents` method from the AWS SDK to retrieve log events based on the specified log group and log stream. Once it gets the log events, it processes each event's message field.

Here's a breakdown of the parsing logic:

1. **Iteration over Log Events:**
	
	`const messages = data.events.map((event) => {
    
    It iterates over each log event retrieved from the AWS CloudWatch Logs service.
    
2. **Extracting Message String:**
	
	`const messageString = event.message;
    
    It extracts the log message string from the `message` field of the log event.
    
3. **Using Regular Expression to Extract JSON:**
	
	`const jsonRegex = /\{[\s\S]*\}/; const match = messageString.match(jsonRegex);`
    
    It uses a regular expression to match and extract JSON-formatted content from the log message.
    
4. **Parsing JSON:**
    
```
let messageObj = null;
  if (match) {
    try {
      messageObj = JSON.parse(match[0]);
    } catch (parseErr) {
      console.error('Error parsing JSON', parseErr);
      }
  }
```

If there is a JSON match, it attempts to parse the matched JSON string. If successful, the parsed JSON object is stored in `messageObj`.
    
5. **Parsing Log Entry:**
    
    `const parsedLogEntry = parseLogEntry(messageString, match);`
    
    It calls a helper function `parseLogEntry` to further parse the log entry based on various log entry formats.
    
6. **Combining Parsed Data:**
    
```
if (messageObj !== null && parsedLogEntry.message) {   
	parsedLogEntry[parsedLogEntry.message] = messageObj; 
}
```
    
If there is a parsed JSON object (`messageObj`) and the log entry has a `message` field, it combines the parsed log entry with the JSON object.
    
7. **Returning Parsed Entries:**
    
    `return parsedLogEntry;`
    
    The parsed log entry is then included in the array of `messages`, which will be passed to the next middleware.

### `parseLogEntry` Helper Function:

The `parseLogEntry` function is responsible for further parsing log entries based on various log entry formats. It distinguishes between standard log formats, START/END formats, and other log formats. The parser is a good candidate for iteration. Modify it to your desire.

### Example:

For a standard log format:

`2023-01-01 12:34:56    log-id    INFO    This is a log message`

The `parseLogEntry` function would extract and return 

```
{ 
	timestamp: '2023-01-01 12:34:56', 
	id: 'log-id', 
	type: 'INFO', 
	message: 'This is a log message' 
}
```

This parsing strategy allows your application to handle different log entry formats and extract meaningful information for display or further processing.
