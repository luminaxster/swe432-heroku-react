# React App in Heroku
Follow this tutorial get a React project deployed in Heroku, and running it your machine during development.
## Getting the repo and creating your own
First, go your GitHub webpage and create a new empty repo, get the repo's url and replace the string "https:<your_repo>.git" below.
Now in your shell:
```
git clone https://github.com/luminaxster/swe432-heroku-react.git
cd swe432-heroku-react/
git init && git remote set-url origin "https:<your_repo>.git"
git push
```
Now go to your Heroku dashboard, create a new app and make these changes:
1. Link your new repo, go to the app's deploy tab and choose "GitHub" deploy method,
select <your_repo> from the list and enable automatic deploy.

Go to your app's settings:

2. In Config Vars, reveal them, and add ```NODE_MODULES_CACHE``` with value ```false```.

3.  Add the following url in build packs:
``` https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz ```


Pushing changes in your repo should automatically deploy your app.
### Troubleshooting
If during deployment, you logs show an error like   ```npm ERR! Cannot read property 'match' of undefined```, you need to clean your Heroku server's cache, follow these commands:
```
heroku plugins:install heroku-repo
heroku repo:purge_cache -a <your_heroku_app_name>
```
Don't forget to replace ```<your_heroku_app_name>``` with your app's name, now redeploy your app.
If the error shows up again, only use ```heroku repo:purge_cache -a <your_heroku_app_name>```.
More details [here](https://help.heroku.com/18PI5RSY/how-do-i-clear-the-build-cache). To stop this issue from keep happening make sure step 2 changes are set in your Heroku app.

## Running locally
Install node.js if you haven't already, and open a shell within the 'swe432-heroku-react' folder and run the commands:
```
npm install
npm run start
```
your local app should be running at ``` localhost:3000 ```.

### Note
Run ``` npm install``` every time you add packages to your ```package.json```, and use ```npm run start``` every time you want to run your app locally (let this command running, it will re-run your program and refresh your browser every time you make your changes to your code).

### Troubleshooting
If you get a criptic error like ```throw er; // Unhandled 'error' event``` during ```npm install```, try removing the package-lock.json file and the node_modules folder, then try re-running the command. You can try these commands in your shell too (assuming you are in the project's root folder):

```
rm package-lock.json
rm yarn.lock
rm -rf ./node_modules
npm install
```

# References
[Creating a React app for Hook from scratch](https://github.com/mars/create-react-app-buildpack)

[Learning about React Hooks (watch Dan's video)](https://reactjs.org/docs/hooks-intro.html)

[Fancy UI](https://material-ui.com/)

[React Hook types](https://reactjs.org/docs/hooks-overview.html)

[JS Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

[JS keyword Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

[A fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

[A URL to fetch for](https://randomuser.me/)

