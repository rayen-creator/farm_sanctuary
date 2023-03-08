import { roles } from "./role";

export type User = {
    'id': String;
    'username': String
  'phone': Number
    'email': String
    'password': String
    'isActive': Boolean
  'createdAt': Date
  'updatedAt': Date
  'isBlocked': Boolean
    'role': roles
  'image': {
    'url': string;
    'contentType': string;
  };
}
