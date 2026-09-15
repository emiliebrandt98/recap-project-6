import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  // Update
  if (request.method === "POST") {
    const form = formidable({});

    try {
      const [fields, files] = await form.parse(request);

      const uploadedFile = files.image?.[0];

      const oldPublicId = fields.oldPublicId?.[0];

      if (!uploadedFile) {
        response.status(400).json({
          status: "No image provided",
        });
        return;
      }

      const cleanName = uploadedFile.originalFilename
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9]/g, "-");

      const newFilename = `${Date.now()}-${cleanName}`;

      // Upload new image
      const uploadResult = await cloudinary.v2.uploader.upload(
        uploadedFile.filepath,
        {
          public_id: newFilename,
          folder: "activities",
          format: "webp",
          quality: "auto:good",
        }
      );

      // If this is an update, delete the old image
      if (oldPublicId) {
        try {
          await cloudinary.v2.uploader.destroy(oldPublicId);
        } catch (deleteError) {
          console.error("Failed to delete old image:", deleteError);
        }
      }

      response.status(200).json({
        imageUrl: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
      return;
    } catch (error) {
      console.error("Image upload failed:", error);

      response.status(500).json({
        status: "Image upload failed",
      });
      return;
    }
  }

  // Delete
  if (request.method === "DELETE") {
    try {
      // Manually parse the request body when bodyParser is disabled
      const buffers = [];
      for await (const chunk of request) {
        buffers.push(chunk);
      }
      const { publicId } = JSON.parse(Buffer.concat(buffers).toString());

      if (!publicId) {
        response.status(400).json({
          status: "No publicId provided.",
        });
        return;
      }

      await cloudinary.v2.uploader.destroy(publicId);

      response.status(200).json({ success: true });
      return;
    } catch (error) {
      console.error("Image deletion failed:", error);

      response.status(500).json({ status: "Image deletion failed" });
    }
  }

  response.status(405).json({ status: "Methode not allowed." });
}
