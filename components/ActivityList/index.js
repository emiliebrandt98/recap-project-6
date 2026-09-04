import Image from "next/image";


export default function ActivityList() {
  return (
    <div>
      {dummyActivities.map((activity) => {
        return (
          <>
            <Image
              key={activity._id}
              alt="activity"
              width={40}
              height={40}
              src=""
            />
            <p>{activity.title}</p>
          </>
        );
      })}
    </div>
  );
}
