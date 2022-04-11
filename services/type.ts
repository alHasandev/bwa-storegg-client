export type RequestSuccess<T = Record<string, unknown>> = {
  data: T;
};

export type ValidatorError = {
  kind: string;
  message: string;
  name: string;
  path: string;
  value: string;
};

export type RequestError = {
  status: number;
  data: {
    message: string;
    fields: ArrayLike<ValidatorError> | { [s: string]: ValidatorError };
  };
  message: string;
  type: 'error' | 'warning';
};
