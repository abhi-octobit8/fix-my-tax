import React from "react";
import { Helmet } from "react-helmet";

const SeoHeader = ({ ...props }) => {
  const { title = "", description = "" } = props;
  return (
    <Helmet>
      <meta name="description" content={description} />
      <title>{title}</title>
    </Helmet>
  );
};

export default SeoHeader;
