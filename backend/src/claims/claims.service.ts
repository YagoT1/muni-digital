import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';

@Injectable()
export class ClaimsService {
  private claims: Array<CreateClaimDto & { id: number; createdAt: string }> = [];

  create(input: CreateClaimDto) {
    const claim = {
      id: this.claims.length + 1,
      createdAt: new Date().toISOString(),
      ...input,
    };
    this.claims.push(claim);
    return { message: 'Reclamo registrado', claim };
  }
}
