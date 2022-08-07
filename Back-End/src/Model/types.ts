export type AuthenticationData = {
    id: string
}

export interface SignupInputDTO  {
    name: string,
	email: string,
	cpf: string,
	password: string
}

export interface LoginInputDTO extends Omit<SignupInputDTO, 'name' | 'cpf'> {}

export interface UpdateInputDTO extends Omit<SignupInputDTO, 'password'> { token: string}

export interface UpdateUserDB extends Omit<SignupInputDTO, 'token'| 'password'> {id: string}

export interface UserDB extends Omit<SignupInputDTO, 'password'> { id:string, hashPassword:string }