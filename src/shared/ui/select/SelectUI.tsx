import { useState } from "react";
import type { OptionType, SelectType } from "@/shared/types";
import Select, { type SingleValue } from "react-select";

export const SelectUI = ({ options, role_id }: SelectType) => {
  const [selected, setSelected] = useState<OptionType | null>(options[role_id]);

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelected(option);
  };

  return (
    <Select
      classNamePrefix="custom-select"
      options={options}
      value={selected}
      onChange={handleChange}
    />
  );
};
