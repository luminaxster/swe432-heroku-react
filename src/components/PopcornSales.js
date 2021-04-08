import React, { useState, useCallback, useEffect, useRef } from "react";
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import getPlace from "../core/popcorn";

function numberOnly(value, fallbackValue) {
  if (isNaN(value)) {
    return fallbackValue;
  } else {
    return value;
  }
}

function PopcornSales(props) {
  const {
    zipURL="https://swe432tomcat.herokuapp.com/zipLookup",
    library = "fetch",
  } = props;
  const [addressZip, setAddressZip] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [zipError, setZipError] = useState(null);

  // gets the response text, splits it into city and state, and puts them in the document
  const getPlaceSuccessCallback = useCallback((result) => {
    const { city, state } = result;
    if (state && city) {
      setAddressState(state);
      setAddressCity(city);
    }
  }, []);

  // handles request error
  const getPlaceFailureCallback = useCallback(() => {
    setZipError(
      "ZIP service unavailable, please check your internet connection an try again."
    );
  }, []);

  const handleAddressZipChange = useCallback((event) => {
    setAddressZip((currentAddressZip) => {
      const nextAddressZip = event.target.value;
      return numberOnly(nextAddressZip, currentAddressZip);
    });
  }, []);

  const handleAddressStateChange = useCallback((event) => {
    setAddressState(event.target.value);
  }, []);

  const handleAddressCityChange = useCallback((event) => {
    setAddressCity(event.target.value);
  }, []);

  const focusedElementRef = useRef();
  useEffect(() => {
    // focusedElementRef.current.focus(); // commented in codesandbox for "obvious" reasons
  }, []);

  useEffect(() => {
    setZipError(null);
    if (addressZip.length > 4 && !addressState && !addressCity) {
      getPlace(zipURL, addressZip, getPlaceSuccessCallback, getPlaceFailureCallback, library);
    }
  }, [
    zipURL,
    library,
    addressZip,
    getPlaceSuccessCallback,
    getPlaceFailureCallback,
    addressState,
    addressCity
  ]);

  return (
    <div css={css`
      position: relative;
    `}>
      <h2>Welcome to SWE Popcorn Sales</h2>
      {/* <form action="" name="addressForm"> */}
      {/* <!-- A borderless table of text widgets for name and address --> */}
      <table>
        <tr>
          <td> Buyer's name: </td>
          <td>
            <input type="text" name="name" size="30" ref={focusedElementRef} />
          </td>
        </tr>
        <tr>
          <td> Street address: </td>
          <td>
            <input type="text" name="street" size="30" />
          </td>
        </tr>
        <tr>
          <td> Zip code: </td>
          {/* <!-- Call JS function getPlace() when zip code box is changed --> */}
          <td>
            <input
              type="text"
              name="zip"
              size="10"
              value={addressZip}
              onChange={handleAddressZipChange}
            />
          </td>
        </tr>
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
      </table>

      <img
        src="https://www.cs.gmu.edu/~offutt/classes/432/examples/ajax/popcorn/popcorn.jpg"
        alt="popcorn"
        css={css`
          position: absolute;
          left: 400px;
          top: 50px;
        `}
      />

      {/* <!-- The submit and reset buttons --> */}
      <p>
        <input type="submit" value="Submit Order" />
        <input type="reset" value="Clear Order Form" />
      </p>
      {/* </form> */}
      <div style={{ color: "red" }}>{zipError}</div>
    </div>
  );
}

export default PopcornSales;
