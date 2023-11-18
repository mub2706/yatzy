
# Yatzy Game Client-Server
  

 
  
#### Server Setup Steps
- The first step is to create constant variables such as the server port and the pathway
- Then join the pathway with a public directory
- A request is then sent and a message is displayed on the console
- And then another request is sent with the dice calculation logic. It uses the public directory established earlier. It also sends a request for the html file as well as the dice images.
- Then adding the rest of the specific types of scoring functions to the server side.

### API Endpoint Usages
- There is an API endpoint to retrieve the current roll and round numbers
- There is an API endpoint to update the user's roll number
- There is an API endpoint to reset the game

### Other Information
The code for the client-server is in a new JavaScript file called dicemodule.js. The other two files for the assignment are game.js and play.html. The game.js contains the JavaScript code for the yatzy game and play.html has the design.
