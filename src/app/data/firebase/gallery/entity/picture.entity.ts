import { Entity } from '../../../../../domain/models/entity.model';
import { BucketFile } from '../../../../../domain/models/bucket-file.model';

export interface Picture extends Entity, BucketFile {}
