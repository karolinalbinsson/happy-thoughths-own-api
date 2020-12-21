import React, { useState } from "react";

export const Form = (props) => {
const [thoughtText, setThoughtText] = useState("");
const [numChars, setnumChars] = useState(0);
const [inputLengthOK, setinputLengthOK] = useState(true);

const submitForm = (event)=>{
  event.preventDefault();
  props.submitForm(thoughtText);
  resetInputField();
}

const resetInputField = () => {
  setThoughtText("");
  setnumChars(0);
}

const handleChange = (event) =>{
  setThoughtText(event.target.value);
  const value = event.target.value;
  setnumChars(event.target.value.length);
  value.length <= 140 ? setinputLengthOK(true) : setinputLengthOK(false);
}

  return (
        <form 
        className="form" 
        onSubmit={(event) => submitForm(event)}> 
          <label 
          className="input-label"> 
          What's making you happy right now?
            <textarea 
            className="text-input" 
            rows="5" 
            value={thoughtText} 
            required 
            onChange={(event) => handleChange(event)}></textarea>
          </label>
          {inputLengthOK && <p className="input-ok">{numChars}/140</p>}
          {!inputLengthOK && <p className="input-not-ok">{numChars}/140</p>}  
          <button 
          className="submit-button" 
          type="submit"> 
           <span role="img" aria-label="heart emoji">
           ❤️</span> Send happy thought 
            <span role="img" aria-label="heart emoji">
           ❤️</span> 
          </button>
        </form>
  )
}