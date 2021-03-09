import { LogTarget } from './log-target.model';
import { LogLevel } from './log-level.model';

export class LogTargetConfig implements LogTarget {
  constructor(
    public label: string,
    public name: string,
    public level: LogLevel
  ) {}
}
