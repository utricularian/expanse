This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It has since been ejected

## Starting the world

Before starting any steps, the following environment variables are required:

```
ENV_EXPANSE_ADMIN_USERNAME
ENV_EXPANSE_ADMIN_PASSWORD
ENV_EXPANSE_DATABASE_NAME

DATABASE_URL <postgres://(username):(password)@localhost:5432/(database)>

PGPASSWORD
```

Build the databases using a bespoke initialization script

```
scripts/init_db
```

In the top level directory, ensure all tests are green by starting a test watcher:

```    
yarn run db:test:prepare
yarn run test
```

Start the dev server at [http://localhost:3006](http://localhost:3006):

```
yarn migrate up
yarn db:seed
yarn run dev
```


## Additional Available Scripts


### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

