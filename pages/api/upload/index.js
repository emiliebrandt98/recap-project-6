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
  // ensure this route can only be used for POST requests
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not allowed" });
    return;
  }

  // we initialize formidable with an empty options object
  const form = formidable({});

  // we have access to a .parse() method that allows us to access the fields
  // and more importantly the files
  try {
    const [fields, files] = await form.parse(request);
    const uploadedFile = files.image?.[0];
    const oldPublicId = fields.oldPublicId?.[0];

    if (!uploadedFile) {
      return response.status(400).json({ message: "No image provided" });
    }

    const cleanName = uploadedFile.originalFilename
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "-");

    const newFilename = `${Date.now()}-${cleanName}`;

    // now we have the information about the image, we can send it to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(
      uploadedFile.filepath,
      {
        public_id: newFilename,
        folder: "activities",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      }
    );

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
    response.status(500).json({ status: "Image upload failed" });
    return;
  }
}
