
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
  - Create page structure using two HTML pages
  - Page data will be displayed through text
  - Buttons and textboxes for input and submission
  - Link to view the recent submissions

  ## CSS
  - Page Header/Logo?
  - Main body and design
  - Navigation links
  - Page structure/good design applications
  - Coloring
  - Images?

  ## JavaScript
  - Database access
  - Communication for submissions between all users
  - Animation?
  - Logic for a prompt generation as well as displaying the result
  - Ensures valid input
 
  ## Service/Database
  - Ensure valid database connection to obtain prompts
  - Make sure a valid user is logging in or a new user needs to be created
  - Ensure secure communication for users
  - Allow users to access the resulting text
