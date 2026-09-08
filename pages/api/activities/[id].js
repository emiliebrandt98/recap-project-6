import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const activity = await Activity.findById(id).populate("categories");

      if (!activity) {
        response.status(404).json({ status: "Activity not found." });
        return;
      }

      response.status(200).json(activity);
      return;
    }

    if (request.method === "PUT") {
      const activityData = request.body;

      const activity = await Activity.findByIdAndUpdate(id, activityData, {
        new: true,
      });

      if (!activity) {
        response.status(404).json({ status: "Error updating Activity" });
        return;
      }

      response.status(200).json({ status: "activity updated" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ status: "Internal Server Error." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
