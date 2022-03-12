export interface User {
  _id: string,
  email: string,
  displayName: string,
  phoneNumber: string,
  token: string,
}

export interface RegisterUserData {
  email: string,
  password: string
}

export interface LoginUserData {
  email: string,
  password: string,
  displayName: string,
  phoneNumber: string
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    displayName: FieldError,
    phoneNumber: FieldError
  }
}

export interface LoginError {
  error: string
}
