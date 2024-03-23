import { Injectable } from '@nestjs/common';
import { PowerService } from 'DI-prac/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}
  getData() {
    console.log('Drawing 20 watts of power from PowerService');
    this.powerService.supplyPower(20);
    return 'data!';
  }
}
