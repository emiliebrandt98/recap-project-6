import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    response.status(500).json({ error: "Database connection failed" });
    return;
  }

  if (request.method === "GET") {
    try {
      const activities = await Activity.find().populate("categories");
      response.status(200).json(activities);
      return;
    } catch (error) {
      response.status(500).json({ error: "Error retrieving the activities" });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const activitiesData = request.body;
      const newActivity = await Activity.create(activitiesData);

      const formattedActivity = newActivity.toObject();
      formattedActivity.createdAt = new Date(
        formattedActivity.createdAt
      ).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      });
      formattedActivity.updatedAt = new Date(
        formattedActivity.updatedAt
      ).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      });

      response
        .status(201)
        .json({ status: "Activity Created", activity: formattedActivity });
      return;
    } catch (error) {
      if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message });
        return;
      }
      response.status(500).json({ error: "Error creating the activity" });
      return;
    }
  }

  response.status(405).json({ status: "Method not allowed" });
  return;
}
