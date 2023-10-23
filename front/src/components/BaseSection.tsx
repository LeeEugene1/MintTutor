import React from "react";

const BaseSection = (props) => {
  return (
    <div
      className={`relative max-w-screen-xl h-full items-center px-4 sm:px-8 mx-auto grid grid-cols-12 gap-x-6 overflow-hidden ${
        props.className ? props.className : ""
      }`}>
      {props.children}
    </div>
  );
}

export default BaseSection;