Okay so this is a todo list to get this project up and functional


Part 1:
Front end:
We want a tile that says Decision App
Under that we want users to be able to enter the task they want reasons for
Then underneath that they will retrieve those tasks by fetching our api from the backend and those would be populated in a list format with a nice transition animation
Then you will style everything

Backend:
The backend's only purpose in the beginning is to retrieve data from Gemini and serve it to the front end. THAT'S IT. Additional functionality in part 2

Part 2:
Front end:
Make a logged in state in your app and show a little profile icon in the top right that should take you to a profile page and have a form of options for your profile to fill out

Backend:
This is where it gets tricky ngl. So you want to do all the login and authentication through django. This may mean having your code for the login page be separate from react, which could potentially look awful. Of course later on we could come up with a better way but we want basic functionality. We also want to store user data in a MySQL database. Look up exactly how this should be done. The idea is that user data has things like username and email and idk about password because of encryption but beyond that:
Career, Hobbies (List), Age, Gender, Goals (List of options). These need to be stored per user but it's weird because I dont need this data but the user does, so it's kinda like client data.