const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  if (!localFilePath) return null;
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return result.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
}

async function deleteFromCloudinary(cloudinaryFileUrl) {
  if (!cloudinaryFileUrl) return;
  try {
    const publicId = cloudinaryFileUrl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error in deleting file: ", error);
  }
}

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
