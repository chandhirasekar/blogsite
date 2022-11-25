import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const Badge = ({ children, styleinfo }) => {
  const colorKey = {
    tarvel: "primary",
    fashion: "danger",
    sports: "success",
    fitness: "dark",
    tech: "info",
    food: "warning",
  };
  return (
    <h5 style={styleinfo}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  );
};

export default Badge;
