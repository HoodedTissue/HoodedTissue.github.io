import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

const photosDirectory = path.join(process.cwd(), "public/photos");

export interface Photo {
    src: string;
    alt: string;
    width: number;
    height: number;

}
export function getPhotos(): Photo[] {
    const filenames = fs.readdirSync(photosDirectory);

    const photos = filenames.map((filename) => {
        const fullPath = path.join(photosDirectory, filename);
        const buffer = fs.readFileSync(fullPath);
        const dimensions = imageSize(buffer);

        return {
            src: `/photos/${filename}`,
            alt: filename,
            width: dimensions.width,
            height: dimensions.height
        };
    });

    return photos;
}