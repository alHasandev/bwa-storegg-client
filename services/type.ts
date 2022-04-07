export type ValidatorError = {
  kind: string;
  message: string;
  name: string;
  path: string;
  value: string;
};

export type RequestError = {
  status: number;
  data: any;
  message: string;
  type: 'error' | 'warning';
};
