export enum SessionStatus {
  Upcoming = 0,
  Live = 1,
  Finished = 2,
}

export const getSessionStatus = (
  startTime: string,
  endTime: string
): SessionStatus => {
  const currentTime = new Date();

  // Parse the startTime and endTime strings
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const start = new Date();
  start.setHours(startHours, startMinutes, 0, 0);

  const end = new Date();
  end.setHours(endHours, endMinutes, 0, 0);

  if (currentTime < start) {
    return SessionStatus.Upcoming;
  } else if (currentTime >= start && currentTime <= end) {
    return SessionStatus.Live;
  } else {
    return SessionStatus.Finished;
  }
};

export const daysUntilConcert = (concertDate: string): number => {
  const concertDateObj = new Date(concertDate);
  const currentDate = new Date();

  // Calculate the difference in time
  const timeDifference = concertDateObj.getTime() - currentDate.getTime();

  // Convert time difference from milliseconds to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};

// Email format validation
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation
// Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const isValidDate = (dateString: string): boolean => {
  if (!dateString) {
    return false;
  }

  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export function extractFilename(imagePath: string) {
  return imagePath.split("/").pop() || "";
}
