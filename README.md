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
# Getting the front-end and back-end to communicate
We are working with a back-end and a front-end where the front-end client via a React app is making a request to a back-end Tomcat server. The server offers a servlet as a POST microservice (doPost()) at a certain URL, to which the client fetches for via POST, and gets a response to show in the browser.

## Check it out
The deployed solution ia available: [back-end service](https://swe432tomcat.herokuapp.com/echo), and [front-end client]( https://swe432-heroku-react.herokuapp.com/).

## Workflow
this workflow uses two heroku apps in different repos, this one for the the front-end and [this one](https://github.com/luminaxster/swe432tomcat) for the back-end. The following workflow explains how they are used together:

0. [The backend echo microservice](https://github.com/luminaxster/swe432tomcat/blob/master/src/main/java/servlet/EchoServlet.java):

 a. ```@WebServlet(name = "EchoServlet", urlPatterns = {"/echo"})```: Maps the URL yourwebsite.com/**echo** like in  https://swe432tomcat.herokuapp.com/echo.

 b. ```protected void doPost (HttpServletRequest req, HttpServletResponse res) ...```: Servlet method for handling POST requests.

 c. ```out.print(new Gson().toJson(data));```: Sends the data back to the client that look like  ```{"key":"value"}```.

 

1. [The front-end React app](https://github.com/luminaxster/swe432-heroku-react/blob/master/src/components/Fetcher.js):

d. ```useEffect( ()=> {...  fetchData().catch(e=>{console.log(e)});}, [url, clicks]);```: This React hook will be trigger every time either of those variables change, including the first time they are assigned, afterwards, it will be triggered everytime the submit button is clicked.

e. ```const fetchData= async()=>{...}```: This is the function called within the hook, it is asynchronous so when is called it does not block the UI until it finishes its payload, instead, it returns a promise, a wrapping object that executes the function in the background and offers a method to know when it is done. This method is then(), to which you can pass a function that will be called back once the promise finishes. We did not use the then() method directly, but catch(), which works the same way but when there is an error. In **d.** we passed one arrow function to catch when there is an error.

 f. ```const res = await fetch('https://swe432tomcat.herokuapp.com/echo', {method:'POST', mode: 'cors', headers:{'Content-Type': 'application/x-www-form-urlencoded'}, body:'key1=value1&kay2=value2'}```: Fetch does what HTML's form action does internally, in this case, we are configuring a call to the back-end microservice, with the same configuration as a form action, and sending the values manually in the request's **body**. Previously, these values were contained within the form and sent after clicking submit. 

Await is a short-hand for resolving fetch(...).then(), so it will make the call to the server(at **a.**) (**b.** will start handling it), and wait until it responds (**c.** finishes handling it) and comes back to the client, thus assigned to **res**.

 g. ```const json = await res.json();```: **json** will be assigned the JSON data assembled in **c.**, where res.json() returns a promise, and similarly to **d.**, the result of then() will be assigned to the variable json, which should have the value {key1:"value1",key2:"value2"}, based on whast was sent in **body(f.)**.

 h. ```setResponse(json);```: This will update the state of the variable **response** to what what **json** is referencing, thus, initiating a re-render the component Fetcher.

 i. ```const [response, setResponse] = useState(null);```: This will re-run the functional Component Fetcher, now the useState hook has set response to ```{key1:"value1",key2:"value2"}```. Note that ```null``` is assigned only the first time the compenent is executed.  

 j. ```response?JSON.stringify(response):...```: Since response has ```{key1:"value1",key2:"value2"}```, **response?*** evaluate to ```true```, thus printing the following ```{"key1":"value1","key2":"value2"}``` in the browser.

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

