/** Custom SimpleObject in form key:value  */
export type SimpleObject = { [key: string]: any };

/** User */
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}
