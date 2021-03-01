# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

-------------------------
Steps:

1. Upload UI to GCP:
    gsutil rsync -R build gs://shopping-list-poc 
    
2. To make all objects in your bucket readable to everyone on the public internet:
    gsutil iam ch allUsers:objectViewer gs://shopping-list-poc
    
3.Assigning specialty pages
    gsutil web set -m index.html gs://shopping-list-poc
    
Deploy:
    $ cd infrastructure && terraform init
    $ terraform plan
    $ terraform apply
    $ cd ../shopping-list-webapp npm run-script build && gsutil rsync -R build gs://shopping-list-poc
    
Access:
    http://storage.googleapis.com/shopping-list-poc/index.html
    not this: http://shopping-list-poc.storage.googleapis.com/index.html
    
### TO DO:

- [x] create CF (Cloud Function) to delete items
- [x] create CF to delete all items
- [x] create Pubsub Topic to push events
- [x] write events to Pubsub from every CF
- [x] create CF to read events from Pubsub Topic once an hour and generate report and write it to db
- [x] create CF to read reports
- [ ] create a bucket for reporting UI that calls reporting CF 