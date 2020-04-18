# A Modest 'trello' like App 

 [![Generic badge](https://img.shields.io/badge/Looking_for_job-Hire_me-green.svg?style=for-the-badge)](https://shields.io/)

![license](https://img.shields.io/npm/l/m)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)  [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![Test App](https://github.com/AhmedKhattak/trello-todo/workflows/Test%20App/badge.svg)




  




**This is the backend portion of the app**

This is a trello like web app to organize and manage todos. Todos can be part of lists or as i call them groups. Each group is part of a board. A user can have multiple of all of these.

#### Features
Some functionalities are 
* Boards 
    * starred boards
* Groups
* Todos
* Todos can have
    * checklists
    * description in markdown
    * due date
    * tags 
    * starred todo 
    * cover - the image of a todo task
    * copy a todo
    * activity timeline
* Users
* Full text search and queryable information 
    about all todos, groups and boards
* Shortcuts

#### Quality checks
This app follows as close as possible node best practices https://github.com/goldbergyoni/nodebestpractices where ever applicable and feasable 

* Project Structure Practices
    * [x] Structure your solution by components
    * [x] Layer your components, keep Express within its boundaries
    * [ ] Wrap common utilities as npm packages
    * [x] Separate Express 'app' and 'server'
    TODO:  Use environment aware, secure and hierarchical config
    * [ ] Use environment aware, secure and hierarchical config
* Error Handling Practices
 * [x] Use Async-Await or promises for async error handling
 * [x] Use only the built-in Error object
 * [x] Distinguish operational vs programmer errors
 * [x] Handle errors centrally, not within an Express middleware
 * [x] Document API errors using Swagger or GraphQL
 * [ ] Exit the process gracefully when a stranger comes to town
 * [x] Use a mature logger to increase error visibility 
#### Tech stack

Uses Git flow for managing features.
Uses eslint and prettier with pre commit hooks

##### Backend
* Nodejs
* Mysql for persistence
* Vanilla Javascript - ES6
* JWT for authorization - no session is maintained
* API documentation using open api v3.0.1 schema and swagger ui
* App ,database, and documentation server runs in a docker container
* Internally uses pm2 for crash recovery
* Uses LogRocket for App montoring
* CI/CD done by jenkins
* docker swarm for orchestration



#### How to run
place commands here



#### Run code tests
For testing i used supertest that can run tests directly againts api endpoints.

And mocha for unit and integration tests

#### Testing

Open in postman and start testing the api.
Refer to swagger ui for documentation





###







        ██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗
        ██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝
        ███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  
        ██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  
        ██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗
        ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝
                                                
I am actively looking for a job as a full stack developer who has devops experience.