import { PartialType } from '@nestjs/mapped-types';
import { CreatePenDto } from './create-pen.dto';

export class UpdatePenDto extends PartialType(CreatePenDto) {}
