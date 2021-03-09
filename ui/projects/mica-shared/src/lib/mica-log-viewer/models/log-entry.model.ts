import { LogLevel } from './log-level.model';

export interface LogEntry {
  id: number;
  time: number;
  targetName: string;
  sourceClass: string;
  sourceMethod: string;
  level: LogLevel;
  message: string;
  parameters: string;
  thrown: string;
  thread: number;
}
