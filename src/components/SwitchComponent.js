import { Switch } from "react-switch";
import { useState } from "react";

const SwitchComponent = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div className="example">
      <label>
        <span>Trier par prix :</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
      <p></p>
    </div>
  );
};

export default SwitchComponent;
