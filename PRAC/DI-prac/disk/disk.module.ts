import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from 'DI-prac/power/power.module';

@Module({
  imports: [PowerModule],
  providers: [DiskService],
  exports: [DiskService],
})
export class DiskModule {}
