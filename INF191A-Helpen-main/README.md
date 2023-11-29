# INF191 Team Helpen
Team Members: Matthew Nguyen, Amy Pham, Tommy Seo, Renee Uchida

### Important information about .env and API Key 

our API key is in the .env file
our .env file is not committed to Git so you need make to make your own .env file and add the API key into the .env file

Here is how to generate your own API key to put in our .env file:
	- https://support.airtable.com/docs/creating-and-using-api-keys-and-access-tokens
	- Afterwards, create a .env file in the main directory of the application, reload the application, and if your database
	is set up according to our database design the application will function as intended.
  
  

### Installing Dependencies (if their not already visible in packages.json)

dotenv had to be installed onto our project using npm using this command:
	npm i dotenv
	
to install airtable npm and axios npm:
	npm airtable
	npm axios

to run the project
	npm i
	npm start

to stop the project
	control + c
  
  
### Info

ejs allows you to keep html files short as it renders texts onto html files from the server (backend aka app.js)

our baseId can be found in the url of the airtable portal after the word "app"
