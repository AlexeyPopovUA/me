import "server-only";
import sharp from "sharp";
import { getContainImageURL } from "./image";

const BASE_URL = "https://images.oleksiipopov.com";
const BUCKET = "serverless-image-handler-image-source";
const BASE_PATH = "me";

function getDefaultBucketProps(src: string) {
  return {
    bucket: BUCKET,
    key: `${BASE_PATH}${src}`
  };
}

function encodePayloadForUrl(configuration: { [key: string]: unknown }) {
  return `${BASE_URL}/${btoa(JSON.stringify(configuration))}`;
}

/**
 * Get the ratio of the image
 * @TODO Has to be replaced by a service call
 */
async function getImageDimensionsRatio(props: { src: string }) {
  const url = encodePayloadForUrl({
    ...getDefaultBucketProps(props.src),
    edits: {
      png: {
        quality: 10,
      },
      resize: {
        // should be relatively big to determine the ratio w/o effect of internal numbers rounding
        width: 200,
      },
    },
  });

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
    console.error('Error getting image dimensions ratio:', error);
    // Return a default aspect ratio (16:9) as fallback
    return 16 / 9;
  }
}

async function getBlurDataURL({src, width, height}: { src: string, width: number, height: number }) {
  const payloadURL = encodePayloadForUrl({
    ...getDefaultBucketProps(src),
    edits: {
      png: {
        quality: 75
      },
      resize: {
        width,
        height,
        fit: "outside"
      }
    }
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

    // Use sharp to resize and convert to base64
    const base64 = await sharp(Buffer.from(blob))
      .resize(Math.round(width), Math.round(height), { fit: 'outside' })
      .png({ quality: 75 })
      .toBuffer()
      .then(buffer => `data:image/png;base64,${buffer.toString('base64')}`);
    
    return base64;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    // Return a default blur data URL (1x1 transparent pixel)
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
