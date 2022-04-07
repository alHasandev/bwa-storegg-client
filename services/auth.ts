import { postAPI } from '.';
import { TPlayer } from './players';

const route = '/auth';

export type JwtData = {
  iat: number;
  player: TPlayer;
};

export function authSignUp(formData: FormData) {
  return postAPI(`${route}/signup`, formData);
}

export function authSignIn(formData: FormData | any) {
  return postAPI(`${route}/signin`, formData);
}
