
# Mad Lib
This application is a mad lib that allows users to generate prompts and fill in the associated words to create fun stories and responses.

## Elevator Pitch
One of the timeless classic games that has been around since the 1950s, Mad libs are a great way to pass the time whether by yourself or with your family or friends. Mad libs have generally required a pen and prompt packet but now with only your phone or electronic device, you can access a plethora of generated prompts with easy access. Even if you've run out of ideas, you can view recent submissions from other users and keep your creative mind working.

## Design
![Picture of login information](https://github.com/jtalented/startup/blob/main/login%20picture.png)

The application will have a simple login page where a database is used to validate and add new users

The application itself will immediately generate an input prompt for the user with the associated word types. From this page, the user can submit their words (which are validated to not be empty before submission) as well as view recent submissions (last 10) by all users. When a user submits their prompt, the resulting information is added to the text, and the story is displayed to the user. The user can then download the text as .txt file. At any point, the user may request a new prompt or logout.
![The draft image for the main page of the mad lib application](https://github.com/jtalented/startup/blob/main/main%20page.png)

## Key Features
-Secure Login over HTTPS
-Ability to logout
-Generate input prompt
-Ability to input words to the prompt, generate a new prompt, and submit valid input
-Generates text based on the prompt from a selection of stories in the database
-Stores the ten most recent submissions in the database which all users can view
-Ability to download currently displayed story as a text file

## Technologies
These technologies will be used as follows.
- HTML - This will be used to structure the pages and use hyperlinks for submissions
- CSS - This will be used to style the pages as well and ensure the application is accessible from multiple device types
- JavaScript - Increase the page functionality and allow the users to log in, make changes to the prompts, as well as make calls to the backend database
- Service - This will provide functionality to download the resulting text, access the database for verification on login as well as prompt info.
- Database/Login - Allows user info to be stored and accessed
- Websocket - Allows the users to see the recent submissions by all users

# Plan

  ## HTML
  - Create page structure using two HTML pages - [x] (uses 4 pages)
  - Page data will be displayed through text - [x]
  - Buttons and textboxes for input and submission - [x]
  - Link to view the recent submissions - [x] (populated with examples)

  ## CSS
  - Page Header/Logo [x] Added logo to about page
  - Main body and design [x] Added css references for all pages
  - Navigation links [x] added styling for links
  - Page structure/good design applications [x] created standardized page styling
  - Coloring [x] standardized word coloring and formatting
  - Images [x] used images in headers and used css to format them

  ## JavaScript
  - Communication for submissions between all users [x]
  - Prompt download [x]
  - Logic for a prompt generation as well as displaying the result [x]
  - Ensures valid input [x]
  - Local variable storage [x]
  - Update prompt table [x]
  - Once database access is created updates (generate new prompt), (Usernames/passwords),(txtbox labels updated), (previous prompts table updated)
 
  ## Service
  - Create backend server for API endpoints [x]
  - Establish frontend connections for API endpoints [x]
  - Validate json objects can be created sent, and read by frontend and backend [x]
  - Ensure username, date, and prompts are sent to backend for storing [x]
  - Ensure GET works on the recent prompts page [x]
  - Ensure random word generator 3rd party API call works on home page [x]
  - Testing [x]

  ## Database and Startup Login
  - Ensure valid database connection to mongodb [x]
  - Checks if username has already been created [x]
  - If not create a new user and return new user welcome message [x]
  - If returning user and valid password share returning user welcome message [x]
  - Error handling for existing user but wrong password [x]
  - Ensure valid database connection to mongodb for recent prompts [x]
  - Allow 10 most recent prompts [x]
  - When a user submits a prompt have it saved to the database [x]
  - Change homepage to force login before accessing other pages [x]
  - If the user enters the url for a non homepage have it validate they are logged in otherwise direct them to homepage [x]
  - Encrypts passwords [x]

## Websocket
- Added Server side (backend in index.js) websocket listening [x]
- Added client side websocket message listening [x]
- Added Server side websocket sending and broadcasting to all clients [x]
- Added client side message sending to the server [x]
- Added message interpretation on both ends [x]
- In play.js sends a message when the user loads onto the play page notifying all users that they are playing [x]
- In play.js sends a message to all users when a client submits a prompt [x]