import moment from "moment";

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} menit`;
  }

  const duration = moment.duration(minutes, "minutes");
  const hours = Math.floor(duration.asHours());
  const mins = duration.minutes();

  if (mins === 0) {
    return `${hours} jam`;
  }

  return `${hours} jam ${mins} menit`;
};

export const calculateRemainingTime = (
  startTime: Date,
  duration: number
): number => {
  const now = moment();
  const endTime = moment(startTime).add(duration, "minutes");
  const remaining = moment.duration(endTime.diff(now));
  return Math.floor(remaining.asMinutes());
};

export const calculateOvertimeMinutes = (startTime: Date, duration: number): number => {
  const remaining = calculateRemainingTime(startTime, duration);
  return remaining < 0 ? Math.abs(remaining) : 0;
};
