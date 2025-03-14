import React from "react";
import { SimpleRow } from "../types";

  const ColorBox: React.FC<SimpleRow> = ({ name, hex, reference, centroidNumber }) => {
  return (
    <div
      style={{
        backgroundColor: `#${hex}`,
        color: "#ffffff",
        padding: "10px",
        width: "75px",
        height: "75px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontSize: "14px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
      }}
    >
      <div>{`${name} (${reference}:${centroidNumber})`}</div>
      <div>{`#${hex}`}</div>
    </div>
  );
};

export default ColorBox;
