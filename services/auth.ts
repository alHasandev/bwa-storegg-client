import { postAPI } from '.';

const route = '/auth';

export function authSignUp(formData: FormData) {
  return postAPI(`${route}/signup`, formData);
}

export function authSignIn(formData: FormData | any) {
  return postAPI(`${route}/signin`, formData);
}
