export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TAddress = {
  street: string
  city: string
  country: string
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders?: TOrder[]
}
