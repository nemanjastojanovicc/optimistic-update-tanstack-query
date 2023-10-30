import { FC } from "react";

import "./ToggleButton.styles.css";

export type ToggleButtonProps = {
  checked: boolean;
  onClick?: () => void;
};

const ToggleButton: FC<ToggleButtonProps> = ({ onClick, checked }) => (
  <div className="checkbox">
    <input onClick={onClick} type="checkbox" checked={checked} />
  </div>
);

export default ToggleButton;
