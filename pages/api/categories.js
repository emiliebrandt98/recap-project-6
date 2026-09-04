import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Datenbankverbindung fehlgeschlagen" });
  }

  if (request.method === "GET") {
    try {
      const categories = await Category.find();
      response.status(200).json(categories);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Fehler beim Abrufen der Categories" });
    }

}
}