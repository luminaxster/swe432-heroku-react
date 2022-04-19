# React App in Heroku
Follow this tutorial to get a React project deployed in Heroku, and running locally in your machine during development.

If you are new to GitHub, Git, or Heroku, please follow this tutorial [first](https://github.com/luminaxster/swe432tomcat).

Check the currently deployed version: [https://swe432-heroku-react.herokuapp.com](https://swe432-heroku-react.herokuapp.com).

## SWE 432 React Lecture slides (Spring 2021-22)
Part 1 available [here](https://github.com/luminaxster/swe432-heroku-react/blob/master/432Lec11-FrontEndRevisited.pptx).

Parts 2 and 3 available [here](https://github.com/luminaxster/swe432-heroku-react/blob/master/432Lec12-FrontBackEndRevisited.pptx).

### React Setup Types
There are several ways to use React, or any front-end framework, for use in your web apps or talk about code. Depending on your goal, your setup may be different from what others use:

- [Getting started code](https://github.com/luminaxster/swe432-heroku-react/blob/master/public/basic.html): uses hardcoded links to manage packages, quick to try libraries, yet, is not intended for production.

- [Shareable executable code](https://codesandbox.io/s/swe-432-react-two-buttons-example-n3x50.) (AKA Pastebin): manages the environment for you (packages and project), and allows others to see your work online, however, they are mostly for conversations not for production.

- [Production-ready code](https://github.com/luminaxster/swe432-heroku-react): the developer controls the app development and deployment, the app is within an environment where the packages and projects are managed by other software, as is expected in projects within companies. Next class will be about this setup type. 

## Prelude
This project aims to showcase a Single Page App (SPA) built using React, React offers a zero configuration development environment to do so: Create React App ([CRA](https://reactjs.org/docs/create-a-new-react-app.html)). This project already has set up a CRA, so you can build upon it.

CRA uses [NPM](https://docs.npmjs.com/about-npm) to manage the project, [Babel](https://babeljs.io/) to compile/transpile your code, and [Webpack](https://webpack.js.org/) to bundle your app. You do not have to worry about Babel or Webpack, CRA handles them (and other packages) for you.

Think of NPM as Maven for JavaScript, a platform that manages your project dependencies based on a configuration, NPM's package.json is equivalent to Maven's POM.xml. NPM supports scripting so Babel and Webpack can be executed to build your app with CRA. 


## A. Getting the repo and creating your own

### Go to your GitHub webpage
1. Create a new empty repo, and get its URL. It should look like this: 
```
https://github.com/<your_username>/<your_new_repo_name>.git
```

### Go to a terminal in your machine

2. Locate a directory where you want to clone this repo.

3. Now replace `<your_new_repo_URL>` with your new repo's URL in the following commands, and run them:
```ShellSession
git clone https://github.com/luminaxster/swe432-heroku-react.git
cd swe432-heroku-react
git init && git remote set-url origin "<your_new_repo_URL>"
git push
```
## B. Running your React app locally

### Go to your browser

1. Install [NPM](https://nodejs.org/), it comes bundled with Node.js.

### Go to a terminal in your machine

2. Locate the  `swe432-heroku-react` folder and run these commands:
```ShellSession
npm install
npm run start
```

Your local app should be running at `localhost:3000`.

Use `npm run start` to run your app locally and let it running, it will ***watch*** for changes in your code and it will automatically re-bundle your app. You can refresh your browser tab and observe your latest changes.

In the case of `npm install`, you only have to run it when you add packages to your `package.json`.

### Troubleshooting
If you get a cryptic error like `throw er; // Unhandled 'error' event` during `npm install`, try removing the package-lock.json file and the node_modules folder, then try re-running the command.

Alternatively, open a terminal, locate your project's root folder, and run these commands:

#### Unik-Like Systems
```ShellSession
rm package-lock.json
rm yarn.lock
rm -rf ./node_modules
npm install
```

#### Windows (PowerShell)
```ShellSession
rm package-lock.json
rm yarn.lock
rd -r .\node_modules
npm install
```

## C. Deploying your React app

This is section is similar (not equal) to what we did for the servlet project, the goal is to link this GitHub repo to Heroku so when you push your changes to the repo Heroku will detect those changes and redeploy your app.

### Go to your Heroku dashboard

1. In the main page, create a new app.

Go to the app's settings tab:

2. In Buildpacks, add a new buildpack, and save changes after entering the following buildpack URL:
```Http
https://github.com/mars/create-react-app-buildpack.git
```

Go to the app's deploy tab:

4. In Deploy method, choose `GitHub`.
5. In Connect to GitHub, type your new repo name(`<your_new_repo_name>`) and search for it, and connect to it from the list.
6. In Automatic deploys, enable automatic deploy.
7. In Manual deploy, deploy the "master" branch.
8. A build log will appear, wait until it finishes building and deploying the app.
9. In Deploy to Heroku, a view option will appear, it will open a browser tab with the public URL of the app.

Your React app is now deployed.

### Troubleshooting

#### GitHub integration unavailable
Heroku and Github can be integrated to automatically deploy your app (above). However, an `Unauthorized` error notification may show up in the dashboard. This issue have been [reported]((https://status.heroku.com/incidents/2413)) by Heroku (Thanks! anonyomous student from the spring 2022 class).

The solution is to use Heroku's Git service instead of GitHub's:

1. Open a terminal and go to your GitHub repo's folder. 
Unix-like users should use Terminal (MacOS), and Windows users CMD.  

2. Check you are at the right location:
```shell
git status
```
You will receive a message starting with `On branch...`, otherwise, you are not on the right folder or Git has not been configured correctly.

3. Log into your Heroku account if you haven't:
```shell
heroku login
```
It will ask permission to open a browser tab to log you in. Return to the terminal once logged in.

4. Obtain the name of the Heroku app yoiu want to migrate:
```shell
heroku apps
```
You will see your account email and a list of the names of the apps you have access to.

5. Add Heroku Git as another repository in your chosen app's Git configuration:
```shell
heroku git:remote -a <<YOUR_HEROKU_APP_NAME>> 
```
you can locate the name
6. Check the effects of the previous commmand:
```shell
git remote -v
```
There should be two lines starting with `heroku`. Now you can pull and push changes to your Heroku Git repo, in addtion to your existign GitHub one.

7. Push your changes to the new repo to deploy your app:
```shell
git add .
git commit -am "Heroku's Git repo now available."
git push heroku master
```

**Note:** Your GitHub repo is working as it should, we added support to do the same in Heroku. While the integration issue is open, please commit your changes to both repos: GitHub's to manage your codebase, and Heroku's to deploy your app's latest version. 

#### Deployment errors
If during deployment, your logs show an error like  `npm ERR! Cannot read property 'match' of undefined`, you need to clean your Heroku server's cache, run these commands:
```ShellSession
heroku plugins:install heroku-repo
heroku repo:purge_cache -a <your_heroku_app_name>
```
Don't forget to replace `<your_heroku_app_name>` with your app's name, now redeploy your app.
If the error shows up again, only use `heroku repo:purge_cache -a <your_heroku_app_name>`.
More details [here](https://help.heroku.com/18PI5RSY/how-do-i-clear-the-build-cache). To stop this issue from keep happening make sure step 2 change is set in your Heroku app.

Alternatively, you can clear the app's cache in your Heroku dashboard. Go to the app's settings tab In Config Vars, reveal them, and add the key `NODE_MODULES_CACHE` with value `false`.

# Getting the front-end and back-end to communicate
In the following examples, front-end (this React project) components fetch data asynchronously from [back-end Tomcat](https://github.com/luminaxster/swe432tomcat) servlet microservices.

For simplicity, the Tomcat and React Heroku projects are in **separate** Heroku apps.

## Example 1: Popcorn Sales

The deployed solution is available: [back-end service](https://swe432tomcat.herokuapp.com/zipLookup), and [front-end client]( https://swe432-heroku-react.herokuapp.com/)( Popcorn Sales tab).

### [The backend zipLookup microservice](https://github.com/luminaxster/swe432tomcat/blob/main/src/main/java/servlet/zipLookup.java)

 a.
 ```Java
 @WebServlet(name = "zipLookup", urlPatterns = {"/zipLookup"})
 ```
 Maps the URL yourwebsite.com/**zipLookup** like in  `https://swe432tomcat.herokuapp.com/zipLookup`.

 b.
 ```Java
 @Override
 protected void doGet (HttpServletRequest req, HttpServletResponse res) ...
 ```
 Standard servlet method for handling GET requests.

 c.
 ```Java
 out.print(new Gson().toJson(data));
 ```
 Sends `data` back to the client as a JSON formatted string like `"{"key":"value"}"`.


### [The front-end React app](https://github.com/luminaxster/swe432-heroku-react/blob/master/src/components/PopcornSales.js)

d.
```JSX
useEffect(() => {
  setZipError(null);
  if (addressZip.length > 4 && !addressState && !addressCity) {
    getPlace(zipURL, addressZip, getPlaceSuccessCallback, getPlaceFailureCallback, library);
  }
}, [ // dependency array
  zipURL,
  library,
  addressZip,
  getPlaceSuccessCallback,
  getPlaceFailureCallback,
  addressState,
  addressCity
]);
```
The *React hook* `useEffect` will be trigger every time any of the references in the dependency array changes, including the first time they are assigned.

e.
```JSX
function getPlaceFetch(
  url,
  zip,
  thenCallback,
  catchCallback,
) {
  // Call the response software component
  const query = url + "?zip=" + zip;
  fetch(query)
    .then(
      // Register the embedded handler function
      // This function will be called when the server returns
      // (the "callback" function)
      // 4 means finished, and 200 means okay.
      (response) => {
        // Data should look like "Fairfax, Virginia"
        response.json().then(thenCallback);
      }
    )
    .catch(catchCallback);
}
```
By default, this is the function `getPlace(...)` is called within the *hook*, it is *asynchronous* so when is called it does not block the UI until it finishes its payload, instead, it handles a *promise*, a wrapping object that executes the function in the background and offers a method to know when it is done. This method is then(), to which you can pass a function that will be called back once the promise finishes.

 Fetch does what HTML's form action does internally, in this case, we are configuring a call to the back-end microservice, with the same configuration as a form action, and sending the values manually in the request's `query` (`"?zip=" + zip`). Previously, these values were contained within the form and sent after typing the zip code.

 f.
 ```JSX
 fetch(query)
 ```
After making the call to the server at **a.**, **b.** will start processing it, and responds with **c.**. Then at front-end, it will be received and held in this promise.

 g.
 ```JSX
 .then((response) => {
   // Data should look like "Fairfax, Virginia"
   response.json().then(thenCallback);
 })
 ```
 Once the fetch promises is completed, `response.json()` returns a promise with JSON data created in **c.**, then the result of `then()` (pun intended) will be assigned as the first parameter of the `thenCallback` function and be called, which should have the value `{city:"aCity",state:"aState"}`, based on what was sent in **(f.)**

 h.
 ```JSX
 const getPlaceSuccessCallback = useCallback((result) => {
   const { city, state } = result;
   if (state && city) {
     setAddressState(state);
     setAddressCity(city);
   }
 }, []);
 ```
 **Hint:** The `getPlaceSuccessCallback` function was passed in **(d.)** to be used as the `thenCallback` in **(g.)**.
 This will update the state of the variables `addressState` and `addressState` to what `result` is referencing, thus, initiating a re-render the component `PopcornSales`.

 i.
 ```JSX
 const [addressState, setAddressState] = useState("");
 const [addressCity, setAddressCity] = useState("");
 ```
 During rendering of the functional Component `PopcornSales`, the useState hooks set `addressState` and `addressCity` to what **(h.)** processed.
 **Note:** that `""` value assigned only the **first time** the component is rendered.  

 j.
 ```JSX
 <tr>
   <td> City: </td>
   <td>
     <input
       type="text"
       name="city"
       id="city"
       size="30"
       value={addressCity}
       onChange={handleAddressCityChange}
     />
   </td>
 </tr>
 <tr>
   <td> State: </td>
   <td>
     <input
       type="text"
       name="state"
       id="state"
       size="30"
       value={addressState}
       onChange={handleAddressStateChange}
     />
   </td>
 </tr>
 ```
Now the city and state `input` elements will show the respective values to the user thanks to `value={addressCity}` and  `value={addressState}`.

## Example 2: Fetcher (Optional)

The deployed solution is available: [back-end service](https://swe432tomcat.herokuapp.com/echo), and [front-end client]( https://swe432-heroku-react.herokuapp.com/)( Fetcher tab).

### [The backend echo microservice](https://github.com/luminaxster/swe432tomcat/blob/master/src/main/java/servlet/EchoServlet.java)

 a.
 ```Java
 @WebServlet(name = "EchoServlet", urlPatterns = {"/echo"})
 ```
 Maps the URL yourwebsite.com/**echo** like in  `https://swe432tomcat.herokuapp.com/echo`.

 b.
 ```Java
 @Override
 protected void doPost (HttpServletRequest req, HttpServletResponse res) ...
 ```
 Standard servlet method for handling POST requests.

 c.
 ```Java
 out.print(new Gson().toJson(data));
 ```
 Sends `data` back to the client as a JSON formatted string like `"{"key":"value"}"`.



### [The front-end React app](https://github.com/luminaxster/swe432-heroku-react/blob/master/src/components/Fetcher.js)

d.
```JSX
useEffect( ()=> {...  fetchData().catch(e=>{console.log(e)});}, [url, clicks]);
```
This *React hook* will be trigger every time `url` or `clicks` change, including the first time they are assigned, afterwards, it will be triggered every time the submit button is clicked.

e.
```JSX
const fetchData= async()=>{...}
```
This is the function called within the *hook*, it is *asynchronous* so when is called it does not block the UI until it finishes its payload, instead, it returns a *promise*, a wrapping object that executes the function in the background and offers a method to know when it is done. This method is then(), to which you can pass a function that will be called back once the promise finishes. We did not use the then() method directly, but catch(), which works the same way but when there is an error. In **d.** we passed one arrow function to catch when there is an error.

 f.
 ```JSX
 const res = await fetch('https://swe432tomcat.herokuapp.com/echo', {method:'POST', mode: 'cors', headers:{'Content-Type': 'application/x-www-form-urlencoded'}, body:'key1=value1&kay2=value2'}
 ```
 Fetch does what HTML's form action does internally, in this case, we are configuring a call to the back-end microservice, with the same configuration as a form action, and sending the values manually in the request's `body`. Previously, these values were contained within the form and sent after clicking submit.

Await is a short-hand for resolving fetch(...).then(), so it will make the call to the server(at **a.**) (**b.** will start handling it), and wait until it responds (**c.** finishes handling it) and comes back to the client, thus assigned to `res`.

 g.
 ```JSX
 const json = await res.json();
 ```
 `json` will be assigned the JSON data assembled in **c.**, where res.json() returns a promise, and similarly to **d.**, the result of then() will be assigned to the variable json, which should have the value {key1:"value1",key2:"value2"}, based on what was sent in `body`**(f.)**

 h.
 ```JSX
 setResponse(json);
 ```
 This will update the state of the variable `response` to what what `json` is referencing, thus, initiating a re-render the component Fetcher.

 i.
 ```JSX
 const [response, setResponse] = useState(null);
 ```
 This will re-run the functional Component Fetcher, now the useState hook has set response to `{key1:"value1",key2:"value2"}`. Note that `null` is assigned only the first time the component is executed.  

 j.
 ```JSX
 response?JSON.stringify(response):...
 ```
 Since response has `{key1:"value1",key2:"value2"}`, `response?` evaluate to `true`, thus printing the following `{"key1":"value1","key2":"value2"}` in the browser.

# Bonus: Conditional Rendering
Depending on your app's values you can decide which components to show. e.g.:
```JSX
let Component = ()=>{.... return condition?<ComponentA/>: <ComponentB/>;}// you can return null, too.
```

Similar to Example 2's step **j**, you can use response or another variable to keep track if the user clicks the submit button and conditionally render components like a form or result list. These are the relevant statements:

```JSX
function YourComponent(){
...
const [isSubmitted, setIsSubmitted] = useState(false);
....
return isSubmitted? <ResultComponent ... />:
<FormComponent...>
 ...
 <button onClick={()=>{fetch(...)... setIsSubmitted(true)}}>submit</button>
</FormComponent>;
}
```

# References
[Creating a React app for Hook from scratch](https://github.com/mars/create-react-app-buildpack)

[Learning about React Hooks (watch Dan's video)](https://reactjs.org/docs/hooks-intro.html)

[Material UI](https://material-ui.com/)

[React Hook types](https://reactjs.org/docs/hooks-overview.html)

[JS Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

[JS keyword Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

[A fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

[An URL to fetch for](https://randomuser.me/)
