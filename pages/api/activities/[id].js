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

    if (request.method === "DELETE") {
      const deleteActivity = await Activity.findByIdAndDelete(id);

      if (!deleteActivity) {
        response.status(404).json({ status: "Not found." });
        return;
      }

      response.status(200).json({ status: "Activity successfully deleted." });
      return;
    }
  } catch (error) {
    response.status(500).json({ status: "Internal Server Error." });
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
  return;
}
