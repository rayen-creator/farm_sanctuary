import { Order } from "./order";

export type Agent = {
  'id': string;
  'login': string
  'password': string
  'fullName': string
  'email': string
  'phone': Number
  'longitude': string
  'latitude': string
  'createdAt': Date
  'updatedAt': Date
  'image':string
  'orders': Order[]

}
