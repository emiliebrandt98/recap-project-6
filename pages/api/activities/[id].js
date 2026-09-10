import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ error: "Database connection failed" });
  }

  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const activity = await Activity.findById(id).populate("categories");

      if (!activity) {
        return response.status(404).json({ status: "Activity not found." });
      }

      return response.status(200).json(activity);
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

    if (request.method === "DELETE") {
      const deleteActivity = await Activity.findByIdAndDelete(id);

      if (!deleteActivity) {
        return response.status(404).json({ status: "Activity not found." });
      }

      return response
        .status(200)
        .json({ status: "Activity successfully deleted." });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }
    return response.status(500).json({ status: "Internal Server Error." });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
