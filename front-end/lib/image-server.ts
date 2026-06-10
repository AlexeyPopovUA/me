import "server-only";
import sharp from "sharp";
import manifest from "@/lib/image-manifest.json";
import { getContainImageURL, getFullSizeImageURL } from "./image";

async function probeImageAspectRatio(src: string) {
  const url = getFullSizeImageURL({ src });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const blob = await response.arrayBuffer();
    if (!blob || blob.byteLength === 0) {
      throw new Error('Empty or invalid image data received');
    }

    const metadata = await sharp(Buffer.from(blob)).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error('Could not read image dimensions');
    }

    return metadata.width / metadata.height;
  } catch (error) {
    console.error('Error probing image dimensions:', error);
    return 16 / 9;
  }
}

async function getImageDimensionsRatio(props: { src: string }) {
  const fromManifest = manifest[props.src as keyof typeof manifest];
  if (fromManifest) {
    return fromManifest.width / fromManifest.height;
  }

  return probeImageAspectRatio(props.src);
}

async function getBlurDataURL({src, width, height}: { src: string, width: number, height: number }) {
  const payloadURL = getContainImageURL({
    src,
    width,
    height,
    quality: 75,
  });

  try {
    const response = await fetch(payloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const blob = await response.arrayBuffer();
    if (!blob || blob.byteLength === 0) {
      throw new Error('Empty or invalid image data received');
    }

    const base64 = await sharp(Buffer.from(blob))
      .resize(Math.round(width), Math.round(height), { fit: 'outside' })
      .png({ quality: 75 })
      .toBuffer()
      .then(buffer => `data:image/png;base64,${buffer.toString('base64')}`);

    return base64;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
}

export const readBlurredImageSrcPair = async ({src}: { src: string; }) => {
  const ratio = await getImageDimensionsRatio({src});
  const blurDataURL = await getBlurDataURL({src, width: 10, height: 10 / ratio});

  return ({
    src,
    ratio,
    blurDataURL
  });
};
