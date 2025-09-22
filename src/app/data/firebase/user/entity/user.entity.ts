import { Entity } from '../../../../../domain/models/entity.model';

export interface User extends Entity {
  name: string;
  surname: string;
  picture: string;
}
