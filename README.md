# About Pantsy:
![image](https://user-images.githubusercontent.com/107887726/226249916-3a4d27cf-5358-4a70-963e-95832edc630b.png)

- Pantsy is an online e-commerce marketplace that focuses solely on pants, taking inspiration from the ecommerce website Etsy. Our platform provides users with the ability to easily sign up, log in, and create, edit, or delete their own product listings. Additionally, users can add items to their shopping cart and checkout, which will bring them to an orders page.

To check out the live version of our website, simply follow this link: https://pantsy.onrender.com/ . Thank you for considering Pantsy for your pants-shopping needs!


## Technologies used:
   - Javascript
   - Python
   - React
   - Redux
   - Flask
   - NodeJS
   - CSS
   - Database: PostgreSQL
   - Hosting: Render

### This repo is being build and updated by:
- https://github.com/SleptBear
- https://github.com/dro14848
- https://github.com/sfazli96
- https://github.com/Vian-K

## Demo User:
   - A demo user is available in login dropdown menu without need to sign up. Simply click on the "Demo User" button and it will log you in the Demo User.


# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only main branch)

2. Install dependencies

      ```
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   ```
   SECRET_KEY=<your secret key>
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=flask_schema
   ```

6. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

7. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```
   pipenv shell
   ```

   ```
   flask db upgrade
   ```

   ```
   flask seed all
   ```

   ```
   flask run
   ```

8. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

#Features Directions:

### Checkout the images below before examples of how to use the implemented features from this project! All features follow basic (full or partial) CRUD format.

##Demo User/Log in
You can test some features without logging in, but to test all of them please log in or utilize our demo user.
![image](https://user-images.githubusercontent.com/107887726/226251345-d0a4b8c6-e4f6-4404-a512-996d17734b1b.png)

##Sign up:
![image](https://user-images.githubusercontent.com/107887726/226251439-82ef0822-0c37-46e9-8efa-7f7accf90e5c.png)

## Search for pants:
![image](https://user-images.githubusercontent.com/107887726/226251520-a7715bb8-ea8d-488f-bec3-9149b089b73e.png)

## Create a pants listing:
![image](https://user-images.githubusercontent.com/107887726/226251688-fa3a9b3e-c78c-40dc-8e3c-64d360fafecd.png)


## Read details of pants:
![image](https://user-images.githubusercontent.com/107887726/226251614-101172bd-839c-4180-8af8-50bac418a17e.png)

## Edit/Delete a pant listing:
![image](https://user-images.githubusercontent.com/107887726/226251887-15b414ae-6f8e-4402-a5b8-2e7ca39ae47f.png)

## Read/Edit/Delete Shopping Cart:
![image](https://user-images.githubusercontent.com/107887726/226252225-72115dcf-bba6-461c-acfd-e26e3c7e5a03.png)

## Create Shopping Cart Item:
![image](https://user-images.githubusercontent.com/107887726/226252342-0a8867b6-9191-4582-9d8a-bfb485714f1e.png)



## Read/Create/Delete reviews:
![image](https://user-images.githubusercontent.com/107887726/226252054-292e8ddf-4973-4414-bc49-c68580d5caf1.png)



## Bonus Feature (404 page):
![image](https://user-images.githubusercontent.com/107887726/226252363-da44fe3d-269b-403c-9e08-397b522c5002.png)

Bonus Feature (Orders) Create/Read:
![image](https://user-images.githubusercontent.com/107887726/226252486-8f3f3a58-838e-456e-bf13-3945f7a72ac1.png)
![image](https://user-images.githubusercontent.com/107887726/226252501-2e33e670-b977-45aa-b7f9-e2de7aab9ccd.png)











