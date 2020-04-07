import React, { useState } from 'react';

export const aFunc = ()=>{};
export default function Hooks(props) {
    const {name} = props;
    let [clicks, setClicks] = useState(0);
    let [clicks2, setClicks2] = useState(0);

    const doSomething = function (event) {
        console.log(event.currentTarget.getAttribute('data-something'));
        setClicks(clicks + 2);
        setClicks2(clicks2 +4);
    }
    return (
        <React.Fragment>
          <p>Hi, I am {name}</p>
            <p>click count:{clicks}, {clicks2}</p>
            <button onClick={doSomething} data-something="Default">
                Default</button>
        </React.Fragment>

    );
}
