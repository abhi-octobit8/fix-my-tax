import React from "react";

const headerColor = "#f47c01";
const defaultHeaderStyle = { color: headerColor, fontWeight: 500 };

export const Header1 = ({ style, ...props }) => {
  return <h1 style={{ ...defaultHeaderStyle, ...style }} {...props} />;
};

export const Header2 = ({ style, ...props }) => {
  return <h2 style={{ ...defaultHeaderStyle, ...style }} {...props} />;
};

export const Header3 = ({ style, ...props }) => {
  return <h3 style={{ ...defaultHeaderStyle, ...style }} {...props} />;
};

export const Header4 = ({ style, ...props }) => {
  return <h4 style={{ ...defaultHeaderStyle, ...style }} {...props} />;
};
