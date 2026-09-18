export default function sortActivitiesByDate(activities, sortOrder) {
  const activitiesWithDate = activities.filter(
    (activity) => activity.startDate
  );

  const activitiesWithoutDate = activities.filter(
    (activity) => !activity.startDate
  );

  activitiesWithDate.sort((activitySoonest, activityLatest) => {
    const dateSoonest = new Date(activitySoonest.startDate);
    const dateLatest = new Date(activityLatest.startDate);

    if (sortOrder === "soonest") {
      return dateSoonest - dateLatest;
    }
    if (sortOrder === "latest") {
      return dateLatest - dateSoonest;
    }
    return null;
  });

  return [...activitiesWithDate, ...activitiesWithoutDate];
}
