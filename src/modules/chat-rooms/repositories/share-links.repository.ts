import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShareLink } from '../entities/share-link.entity';

@Injectable()
export class ShareLinksRepository {
  constructor(@InjectRepository(ShareLink) private shareLinkEntity: Repository<ShareLink>) {}
}
