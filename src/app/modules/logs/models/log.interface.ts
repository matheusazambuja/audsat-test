import { LogAction } from '../../../core/constants/log-action.type.enum';

export interface ILog {
  action: LogAction;
  time: number;
}
