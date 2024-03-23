import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'DI-prac/power/power.module';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
