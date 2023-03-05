import { roles } from "./role";

export type User = {
    'id': number;
    'username': String
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
