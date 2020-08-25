import { format, addSeconds } from 'date-fns';

export const formatSeconds = (seconds) => {
  var helperDate = addSeconds(new Date(0), seconds);
  return format(helperDate, 'mm:ss');
};
