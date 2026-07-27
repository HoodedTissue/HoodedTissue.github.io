import GalleryGrid from "./gallerygrid";
import { getPhotos } from "@/lib/photos"; 

export default function GalleryPage() {
    const photos = getPhotos();

    return (
    <>
        <h3>gallery</h3>
        <p>a collection of photos that i have taken.</p>
        <GalleryGrid photos={photos} />
    </>
  );
}
