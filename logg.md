## Description or logging of actions and arcitecture of the app for this CA

## Terminal Commands

npm install

npm install sequelize mysql2

npm install passport passport-local express-session

npm start


## Description of the whole app-structure of roles, folders and files

All files inside models-folder is implementing the tables and the relations in the database

All files inside the services-folder is performing CRUD(Create, Read, Update and Delete) to the tables in the database

All files inside the routes-folder is the 'middle-man'. What connects it all. Receives http-requests, calls services-methods, returns responses

All files inside the public folder is pure frontend.

All files inside the views-folder is display-files. HTML and embedded JavaScript. The files that actually displays the pages

app.js starts the server and is the main control-center for the whole app.

auth.js inside the routes-folder is responsible for the users and admin. It initiates serialization and deserialization. It set's up login/logout.
It set's up possibility for signup or making a new user.

authMiddlewares handles user-roles, rights, who have permission to adopt. Who has access to different endpoints, etc.


1. The species-table needs to be populated first. That's because the species-table's primary key is the animals-table's foreign key.
   If the Animals-table was populated first, it would cause problems because it would then refer to a nonexistent Primary Key


2. The temperaments-table does not have a foreign key that is dependent on any parent-table, but it has a many to many relation with animals-table. But it's
   independent. It could also be populated first, but I chose species-table to be first.


3. The animals-table can then be populated thirdly. It could also be populated secondly. As long as it's not populated before species-table
   for the same reasons mentioned before

4. Then the users-table can be populated. The users-table is kind of independent, but it needs to be populated before adoptions-table
   because it holds the primary key which is the adoptions table's foreign key. Users-table's Primary Key is the adoptions-tables Foreign Key.


5. Then the temperamentsForAnimals needs to be populated because it has two foreign keys to both animals and temperaments-tables.
   It cannot be populated before either animals-table or temperaments-table. temperamentsForAnimals is a JOIN-table, that connects
   many to many relations between animals and temperaments-table. Many animals can have many temperaments


6. Lastly, the adoptions-table is going to be populated only when a user actually adopts an animal. Or at runtime.
   But it's important that this table is populated AFTER users and animals tables. Because it has two foreign keys
   that refers to users and animals-tables