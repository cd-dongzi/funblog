import { Controller } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { InitService } from './init.service';

@Public()
@Controller('p/init')
export class InitPublicController {
  constructor(private readonly initService: InitService) {}
}
