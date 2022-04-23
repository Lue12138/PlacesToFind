import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  // React Portal is a first-class way to render child components into a DOM node 
  // outside of the parent DOM hierarchy defined by the component tree hierarchy. 
  // The Portal's most common use cases are when the child components need to visually
  // break out of the parent container.
  // The following line tells ReactDom to render content to "drawer-hook" in html
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
