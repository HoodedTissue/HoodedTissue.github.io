import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

const CLOUD_NAME = "qpiqswkp";

interface RawPhoto {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
}


export interface Photo {
    src: string;
    thumbSrc: string;
    alt: string;
    width: number;
    height: number;
    caption: string; 
}

function getPublicIdFromUrl(url: string): string {
  const uploadIndex = url.indexOf("/upload/");
  const afterUpload = url.slice(uploadIndex + "/upload/".length);
  // Strip the leading version segment, e.g. "v1785184746/"
  const withoutVersion = afterUpload.replace(/^v\d+\//, "");
  // Strip the file extension
  return withoutVersion.replace(/\.[a-zA-Z0-9]+$/, "");
}

function buildUrl(publicId: string, transformation: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformation}/${publicId}.jpg`;
}

export function getPhotos(): Photo[] {
  const filePath = path.join(process.cwd(), "content/photos.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const rawPhotos: RawPhoto[] = JSON.parse(fileContents);

  return rawPhotos.map((photo) => {
    const publicId = getPublicIdFromUrl(photo.src);

    return {
      src: buildUrl(publicId, "w_1600,f_auto,q_auto"),
      thumbSrc: buildUrl(publicId, "w_400,f_auto,q_auto"),
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
      caption: photo.caption,
    };
  });
}