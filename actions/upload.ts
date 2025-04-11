"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64String = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64String}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "bloombear",
      resource_type: "auto",
    });
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
} 