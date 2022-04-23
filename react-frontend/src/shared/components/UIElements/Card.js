import React from 'react';

import './Card.css';

const Card = props => {
  return (
    // `` here is Template literals, Template literals allow expressions in strings
    <div className={`card ${props.className}`} style={props.style}>
      {/* props.children means the component(Card here) will display whatever is 
      included in between the opening and closing tags while invoking the component */}
      {props.children}
    </div>
  );
};

export default Card;
