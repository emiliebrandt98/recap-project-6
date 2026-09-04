import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Database connection failed" });
  }

  if (request.method === "GET") {
    try {
      const activities = await Activity.find().populate("categories");
      response.status(200).json(activities);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving the activities" });
    }
  }
}
