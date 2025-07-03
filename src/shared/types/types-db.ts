export interface UserDB {
  readonly id?: number;
  login: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  registed_at: FormDataEntryValue | null;
  role_id: number;
}
