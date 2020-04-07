# React App in Heroku
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
2. Go to your app's settings and add the following url in build packs:
``` https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz ```

Pushing changes in your repo should automatically deploy your app.

## Running locally
Install node.js if you haven't already, and open a shell within the 'swe432-heroku-react' folder and run the commands:
```
npm install
npm run start
```
your local app should be running at ``` localhost:3000 ```.

** Note:** Run ``` npm install``` every time you add packages to your ```package.json```, and use ```npm run start``` every time you want to run your app locally (let this command running, it will re-run your every time you make your changes to your code).
