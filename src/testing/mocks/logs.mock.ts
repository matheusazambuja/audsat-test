import { LogAction } from '../../app/core/constants/log-action.type.enum';

export const logsMock = [
  { action: LogAction.DELETE_POST, time: 1694086975298, id: 1 },
  { action: LogAction.DELETE_POST, time: 1694087536777, id: 2 },
  { action: LogAction.FILTER_USERS, time: 1694090836718, id: 3 },
  { action: LogAction.FILTER_USERS, time: 1694090840764, id: 4 },
  { action: LogAction.FILTER_USERS, time: 1694091175815, id: 5 },
  { action: LogAction.FILTER_USERS, time: 1694091205672, id: 6 },
];
