import { setUserRole } from "@/app/async-thunk/set-user-role";
import { updateRoleUsers } from "@/app/reducers/users-reducer";
import { useAppDispatch } from "@/app/store";
import { SelectRole } from "@/entities/select-role";
import { ROLE_ID } from "@/shared/constants";
import { SaveButton } from "@/shared/ui";
import { useState } from "react";

type UpdateRoleProps = {
  style: string;
  role_id: number;
  id: number;
};

export const UpdateRole = ({ style, role_id, id }: UpdateRoleProps) => {
  const dispatch = useAppDispatch();
  const [updateCurrentRole, setUpdateCurrentRole] = useState<number>(role_id);

  const handleUpdateRole = () => {
    if (id) {
      dispatch(updateRoleUsers({ id, role_id: updateCurrentRole }));
      setUserRole(id, updateCurrentRole);
    }
  };
  const handleCange = (cur: number) => setUpdateCurrentRole(cur);
  return (
    <div className={style}>
      <SelectRole handleChange={handleCange} role_id={role_id} />
      {role_id !== ROLE_ID.ADMIN && <SaveButton onClick={handleUpdateRole} />}
    </div>
  );
};
