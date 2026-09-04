import Image from "next/image";
const dummyActivities = [
  {
    _id: "1",
    title: "Wandern im Schwarzwald",
    imageUrl: "/placeholder.jpg",
    description: "Eine schöne Tour durch den Schwarzwald.",
    area: "Schwarzwald",
    country: "Deutschland",
    categories: ["Outdoor", "Nature"],
  },
  {
    _id: "2",
    title: "Kajak fahren",
    imageUrl: "/placeholder.jpg",
    description: "Kajaktour auf dem Rhein.",
    area: "Rhein",
    country: "Deutschland",
    categories: ["Water", "Adventure"],
  },
  {
    _id: "3",
    title: "Skifahren in den Alpen",
    imageUrl: "/placeholder.jpg",
    description: "Ein Tag auf der Piste.",
    area: "Alpen",
    country: "Österreich",
    categories: ["Winter", "Sport"],
  },
];

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
