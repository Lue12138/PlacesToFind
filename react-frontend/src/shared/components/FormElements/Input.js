import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

// the reducer function must return a new state
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        // ... simply means copy everything from previous state
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  // When the state management logic is complicated, useReducer() 
  // can extract the state management out of the component.

  //   The useReducer(reducer, initialState) hook accept two arguments: the reducer function
  // here is inputReducer and the initial state, here is {value: props.initialValue || ''
  // ,isTouched: false,isValid: props.initialValid || false}. 
  //   The hook then returns an array of 2 items: the current state and the dispatch function. 
  //  Whenever you want to update the state (usually from an event handler or after completing 
  //  a fetch request), you simply call the dispatch function with the appropritate action 
  //  object: dispatch(actionObject) Then the dispatch function send the action to the reducer function
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  // useEffect accepts two arguments. The second argument is optional.
  // useEffect(<function>, <dependency>). Useffect runs functionon whenever dependency changes
  // If there are multiple dependencies, they should be included in the useEffect dependency array.
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
