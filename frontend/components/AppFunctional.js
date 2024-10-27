import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex); // Index where "B" is located
  const [steps, setSteps] = useState(initialSteps); // Number of moves
  const [message, setMessage] = useState(initialMessage); // Message from API
  const [email, setEmail] = useState(initialEmail); // Email input value

  // Helper function to get coordinates based on the current index
  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  // Helper function to display coordinates message
  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  // Reset all states to their initial values
  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  // Calculate the next index based on direction
  function getNextIndex(direction) {
    const moveMap = {
      left: index % 3 > 0 ? index - 1 : index,
      right: index % 3 < 2 ? index + 1 : index,
      up: index - 3 >= 0 ? index - 3 : index,
      down: index + 3 < 9 ? index + 3 : index,
    };
    return moveMap[direction];
  }

  // Move event handler to update index and steps
  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    if (nextIndex === index) {
      setMessage(`You can't go ${direction}`);
    } else {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage('');
    }
  }

  // Update email input value
  function onChange(evt) {
    setEmail(evt.target.value);
  }

  // Handle form submission
  function onSubmit(evt) {
    evt.preventDefault();
    setMessage(''); // Clear any existing message

    const { x, y } = getXY();

    // post request to server
    axios.post('http://localhost:9000/api/result', { x, y, steps, email })
      .then(response => {
        setMessage(response.data.message); // Set message from server response
        setEmail(''); // Clear email input after submission
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{`You moved ${steps} ${steps === 1 ? 'time' : 'times'}`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
