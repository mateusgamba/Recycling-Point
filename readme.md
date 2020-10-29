# Recycling Point

Recycling Point is a platform focused on helping people find a recycling point nearby. Find out nearby places through geolocation and get rid of rubbish (glass, plastic, paper, organic, metal and e-waste) effectively.

Try out the [Demo](https://recycling-point.netlify.app/).

![](https://repository-images.githubusercontent.com/308050805/46ac1100-1928-11eb-9cc8-0f35c5a01b95)

This project also aims to present some technologies and development methods. It was developed in an easy way, therefore, making updates more easily. You can find more details below.

The project consists of two modules:
- **Server**: API Rest implemented with NodeJS, directory: _/server_
- **Web**: Interface Web developed with RectJS, directory: _/web_

These modules were developed over the following packages:

* **Server**
  * Node.js
  * Express
  * Typescript
  * Sequelize
  * PostgreSQL
  * AWS SDK
  * Multer
  * Cors
  * Dotenv
  * Yup Validation
  * Geocoder

* **Web**
  * ReactJS
  * Typescript
  * Axios
  * Dropzone
  * Icons
  * Leaflet
  * toastify
  * reactstrap

* **Devops**
  * Heroku
  * Netlify
  * GitHub Actions

## Requirements

All of these requirements are provided by [docker-compose](https://docs.docker.com/compose/).

## How to install

### Download using Git

Clone the project from github:

```
git clone https://github.com/mateusgamba/recycling-point
```

### Setting up the environment

There are some environment parameters that you can change it.

All parameters can be found in the `.env.example` file within children directories. Please, rename the file from `.env.example` to `.env`.

Details about the parameters can be found in the section below:

### server/.env

```
# database configuration in a single string
DATABASE_URL=postgres://postgres:postgrespass@db/recpoint-db

# Database client
DB_DIALECT=postgres

# Connection with storage
# For connecting with S3 you can change from local to S3
STORAGE_TYPE=local

# Storage url
STORAGE_URL=http://localhost:5000/happy

# AWS S3 parameters
AWS_ENDPOINT=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=

# Create an Api key to convert from address to geographic coordinates
# Register in https://developer.mapquest.com/
GET_PROVIDER=mapquest
GET_APIKEY=

```

### web/.env

```
# Api url
REACT_APP_API=http://localhost:5000

# Create a token to access mapbox.
# Register in https://www.mapbox.com/
REACT_APP_MAPBOX_TOKEN=
```

## Install

[Docker compose](https://docs.docker.com/compose/) must be installed. Access `recycling-point` directory and run the following command in your terminal:

```
docker-compose up -d
```

Then you must run the following commands to create tables and add default information:

```
# Create table
docker-compose exec server npm run migration
```

## Access

After installing and setting the application, click on the link to access:

[http://localhost:3000](http://localhost:3000)

## Enjoy yourself

As informed above, the features about API are server folder, whereas WEB features are within the web folder.

You can install new packages/dependencies in the application via the container of each server.


Server container
```
docker-compose exec server sh
```

Web container
```
docker-compose exec web sh
```

## Deploy

The deployment process is split into 2 parts. The first part, the server, is deploying to [Heroku](https://www.heroku.com/) and the second, the web, is deploying to [Netlify](https://www.netlify.com/).

The deployment is using [GitHub Actions](https://docs.github.com/en/actions), you can see its configuration on `.github/workflows/` folder.

The `server-deploy.yml` file provides the deployment of the Server to Heroku, whereas the `web-deploy` file provides the deployment of the Web to Netlify. You can find more details about workflow in [Configuring a workflow documentation](https://docs.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow).

Before starting the deployment, you need to set some configurations, you can read the details below:

### Server

You must create an account on Heroku through [Heroku website](https://signup.heroku.com/) and after you must install [Heroku Cli](https://devcenter.heroku.com/articles/heroku-cli) in your computer.

To create a new app and a database, run the following command:
> Please, replace your INSERT_YOUR_APP_NAME to your App name

**Creating a new App**
```
heroku create INSERT_YOUR_APP_NAME
```

**Creating a new Database**

```
heroku addons:create heroku-postgresql:hobby-dev -a INSERT_YOUR_APP_NAME
```

After you must add the following environment variable:
```
heroku config:set DB_DIALECT=postgres
heroku config:set APP_URL=[ADD YOUR APP URL]
heroku config:set STORAGE_TYPE=S3
heroku config:set STORAGE_URL=[ADD YOUR STORAGE STORAGE]
heroku config:set AWS_ENDPOINT=[ADD YOUR AWS ENDPOINT]
heroku config:set AWS_ACCESS_KEY_ID=[ADD YOUR AWS ACCESS KEY ID]
heroku config:set AWS_SECRET_ACCESS_KEY=[ADD YOUR AWS SECRET ACCESS KEY]
heroku config:set AWS_BUCKET_NAME=[ADD YOUR AWS BUCKET NAME]
heroku config:set GET_PROVIDER=mapquest
heroku config:set GET_APIKEY=[ADD YOUR API KEY FROM https://developer.mapquest.com/]
```

The `DATABASE_URL` environment variable already is added automatically when the database is created.

In order the build or deploy via GitHub, you have to be to authenticate via an OAuth token.

To create an OAuth authorisation, on your local machine, run:
```
heroku authorizations:create.
```
This command will return a few pieces of information, please, copy only the Token value.

In your repository, click on **Setting -> Secrets**.

Within Secrets page, you must create a New secret, HEROKU_API_KEY, and insert the token given by the Heroku CLI.

### Web

To public the App, you must create an account on Netlify through [https://app.netlify.com/signup/email](https://app.netlify.com/signup/email).

Then you need to obtain a `Token` in the Netlify UI. You can generate an access token manually in your Netlify user settings for [Personal access tokens](https://app.netlify.com/user/applications?_ga=2.231292575.1093251415.1597154412-108739301.1593980345#personal-access-tokens).

1. Under `Personal access tokens`, select `New access token`.

2. Enter a description and select `Generate token`.

3. Copy the generated token to your clipboard.

4. You must set secret token for your repository on Github by going to **Setting -> Secrets**.

5. Click on `New Secret` button, paste the access token in `Value` input and the `Name field` enter NETLIFY_AUTH_TOKEN then save it.

After you need to create a new application on Netlify, run the following commands to setting up the netlify-cli:

```
docker-compose exec web npm install netlify-cli -g
```

Sign in via command line:

```
docker-compose exec web netlify login
```

A link will be returned, please, click on it and log in.

Run:
```
docker-compose exec web netlify init
```

Awnser the following questions:
```
? Do you want to create a Netlify site without a git repository?
> Yes, create and deploy site manually
```

Please, replace the APPLICATION-NAME to the name of your application.

```
Choose a unique site name (e.g. super-cool-site-by-mateusgamba.netlify.app) or leave it blank for a random name. You can update the site name later?
Site name (optional): {APPLICATION-NAME}
```

Then the following information must be returned:

```
Site Created

Admin URL: https://app.netlify.com/sites/{APPLICATION-NAME}
URL:       https://{APPLICATION-NAME}.netlify.app
Site ID:   5a18e44d-49e2-409f-9947-0f92c4df16da
"{APPLICATION-NAME}" site was created
```

Finally, you must add `Site ID` value to a new Secret value on Github.

**Your repository -> Setting -> Secrets -> New Secret**

```
Name: NETLIFY_SITE_ID
Value: 5a18e44d-49e2-409f-9947-0f92c4df16da
```

## Get in touch!

You can contact me directly on my Email (mateusgamba@gmail.com) or via Linkedin ([https://www.linkedin.com/in/mateusgamba/](https://www.linkedin.com/in/mateusgamba/)).

Kind regards.
