import axios from "axios";
// popcornA.js
//  Ajax JavaScript code for the popcornA.html document
//  Thanks to Sebesta, Programming the World Wide Web

/********************************************************/
// function getPlaceAjax
//  parameter: zip
//  parameter: success callback
//  parameter: error callback (optional)
//  parameter: url (optional)
//  action: create the XMLHttpRequest object, register the
//          handler for onreadystatechange, prepare to send
//          the request (with open), and send the request,
//          along with the zip code, to the server
//  includes: the anonymous handler for onreadystatechange

function getPlaceAjax(
  url,
  zip,
  thenCallback,
  catchCallback,
) {
  let xhr = null;
  if (window.XMLHttpRequest) {
    // IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
  } else {
    // IE5, IE6
    // eslint-disable-next-line
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Register the embedded handler function
  // This function will be called when the server returns
  // (the "callback" function)
  xhr.onreadystatechange = () => {
    // 4 means finished,
    if (xhr.readyState === 4) {
      // and 200 means okay.
      if (xhr.status === 200) {
        // Data should look like "Fairfax, Virginia"
        thenCallback(JSON.parse(xhr.responseText));
      } else {
        catchCallback(xhr.statusText, xhr);
      }
    }
  };
  // Call the response software component
  const query = url + "?zip=" + zip;
  xhr.open("GET", query);
  xhr.send(null);
}

function getPlaceAjaxPromise(
  url,
  zip,
  thenCallback,
  catchCallback,
) {
  const zipPromise = new Promise((resolutionFunc, rejectionFunc) => {
    let xhr = null;
    if (window.XMLHttpRequest) {
      // IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
    } else {
      // IE5, IE6
      // eslint-disable-next-line
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Register the embedded handler function
    // This function will be called when the server returns
    // (the "callback" function)
    xhr.onreadystatechange = () => {
      // 4 means finished,
      if (xhr.readyState === 4) {
        // and 200 means okay.
        if (xhr.status === 200) {
          // Data should look like "Fairfax, Virginia"
          resolutionFunc(JSON.parse(xhr.responseText));
        } else {
          rejectionFunc(xhr.statusText, xhr);
        }
      }
    };
    // Call the response software component
    const query = url + "?zip=" + zip;
    xhr.open("GET", query);
    xhr.send(null);
  });

  zipPromise.then(thenCallback).catch(catchCallback);
}

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

function getPlaceAxios(
  url,
  zip,
  thenCallback,
  catchCallback,
) {
  // Call the response software component
  const query = "zip=" + zip;
  axios
    .post(url, query)
    .then(
      // Register the embedded handler function
      // This function will be called when the server returns
      // (the "callback" function)
      // 4 means finished, and 200 means okay.
      (response) => {
        // Data should look like "Fairfax, Virginia"
        thenCallback(response.data);
      }
    )
    .catch(catchCallback);
}

function getPlace(
  url,
  zip,
  thenCallback,
  catchCallback,
  library = "ajax"
) {
  if(!url){
    throw new Error('getPlace: URL is required');
  }

  let targetLibrary = null;
  switch (library) {
    case "axios":
      targetLibrary = getPlaceAxios;
      break;
    case "fetch":
      targetLibrary = getPlaceFetch;
      break;
    case "promise":
      targetLibrary = getPlaceAjaxPromise;
      break;
    case "ajax":
    default:
      targetLibrary = getPlaceAjax;
  }
  targetLibrary(url, zip, thenCallback, catchCallback);
}

export default getPlace;
