import { Payload, postAPI } from '.';
import { TPlayer } from './players';

const route = '/auth';

export type JwtData = {
  iat: number;
  player: TPlayer;
};

export function authSignUp(formData: Payload) {
  return postAPI(`${route}/signup`, formData);
}

export function authSignIn(formData: Payload) {
  return postAPI<{ data: { token: string } }>(`${route}/signin`, formData);
}
