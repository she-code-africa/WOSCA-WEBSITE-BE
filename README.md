# WOSCA
This is the official website repository for She Code Africa WOSCA project. 

Guidelines for development and to contribute can be found in [GUIDELINES.md](/GUIDELINES.md). Ensure to read this first if you will be contributing

## API Documentation
https://documenter.getpostman.com/view/10230743/Tzz7McNf

### Tools/Stacks
1. Node js
2. Express
4. MongoDB
5. Redis
6. Postman


### Setting up your development environment
1. Clone this repository into your local machine:
```
git clone https://github.com/she-code-africa/WOSCA-WEBSITE-BE.git
```
2. cd into the folder
```
 cd WOSCA-WEBSITE-BE
```

3. Install dependencies from package.json

```
 npm install
```
_If you run into problems while running npm install, try ```npm audit fix``` then run ```npm install``` again_

4. Create `.env` file and fill out the required information 
```
cp .env.example .env
```

5. Start the application by running the server script.

```
e.g npm run server
```

6. If you are yet to install MongoDB, install and set it up on your device (see installation guide [here](https://docs.mongodb.com/manual/installation/) ). After successful installation, start the MongoDB service

6. Install postman to test all endpoints. Visit http://localhost:7000/ to access the server
