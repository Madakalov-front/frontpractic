import { ROLE_NAME } from "@/shared/constants";
import type { OptionType } from "@/shared/types";
import { SelectUI } from "@/shared/ui";

type SelectRoleType = {
  role_id: number;
};

export const SelectRole = ({ role_id }: SelectRoleType) => {
  const options: OptionType[] = Object.entries(ROLE_NAME).map(([, role]) => ({
    value: role,
    label: role,
  }));
  return <SelectUI options={options} role_id={role_id} />;
};
