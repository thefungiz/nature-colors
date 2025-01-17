import React from "react";
import { SimpleRow } from "../types";
import ColorBox from "./ColorBox";

type ColorBoxDisplayProps = {
  data: SimpleRow[];
};

const ColorBoxDisplay: React.FC<ColorBoxDisplayProps> = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {data.map((row, index) => (
        <ColorBox key={index} {...row} />
      ))}
    </div>
  );
};

export default ColorBoxDisplay;
