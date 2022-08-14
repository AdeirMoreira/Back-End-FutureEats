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

export interface UserDB extends Omit<SignupInputDTO, 'password'> { 
	id: string, hashPassword?:string, 
	hasAddress?: boolean,
	address?: string | undefined
}

export interface UserResponse extends Omit<UserDB, 'hashPassword'> { hasAddress: boolean, address?: string | undefined }

export interface AdressDTO {
	CEP?: string,
	street: string,
	number: string,
	neighbourhood: string,
	city: string,
	state: string,
	complement: string,
	token?: string
}

export interface AdressDB extends Omit<AdressDTO, 'token'> { id?: string , userId?: string }

export interface RestaurantsDB {
	id: string,
	logoUrl: string,
	address: string,
	name: string,
	deliveryTime: number,
	description: string,
	category: string,
	shipping: number,
	products?: ProductDB[]
}

export interface TokenDTO { token:string }

export interface DetailDTO extends TokenDTO { id:string }

export interface ProductDB {
	restaurantId: string
	id :string 
	name: string 
	description: string 
	price: number
	category: string
	photoUrl: string
}

export interface ProductObj {
	id:string,
	quantity:number,
	price?: number
}

export interface ProductDTO {
	products: ProductObj[],
	paymentMethod: string
}

export interface PlaceDTO extends TokenDTO { restaurantId: string, productsDTO: ProductDTO }

export interface orderDB {
	id: string
	restaurantId: string
	restaurantName: string
	clientId: string
	totalPrice: number
	createdAt: number
	expiresAt: number
}

export interface checkAdressDB {
	hasAddress: boolean
	address: string | undefined
}