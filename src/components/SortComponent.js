import { Range, getTrackBackground } from "react-range";

import { useState } from "react";

const SortComponent = (props) => {
  const { values, setValues } = props;

  const STEP = 5;
  const MIN = 0;
  const MAX = 500;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "400px",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#09b1ba", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "50px",
              backgroundColor: "#09b1ba",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-22px",
                width: "50px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "12px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#09b1ba",
              }}
            >
              {values[index].toFixed(1)} <span>€</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default SortComponent;
