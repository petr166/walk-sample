import { IUser } from '@app/types';

export interface IUserSignup {
  name: string;
  email: string;
  password: string;
}

export const signupReq = async (data: IUserSignup): Promise<IUser> => {
  const { name, email } = data;

  // mock id using email and current timestamp
  const id = `user-${email.slice(0, email.indexOf('@'))}-${Date.now()}`;
  // mock avatar url
  const avatarUrl = 'https://api.adorable.io/avatars/140/' + id;

  // mock request wait
  await new Promise((r) => setTimeout(r, 300));

  return { name, email, id, avatarUrl };
};

export const deleteUserReq = async () => {
  // mock request wait
  await new Promise((r) => setTimeout(r, 300)); // wait
  return true;
};

export const logoutReq = async () => {
  // mock request wait
  await new Promise((r) => setTimeout(r, 300)); // wait
  return true;
};
