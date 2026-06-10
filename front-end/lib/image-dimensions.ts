import manifest from '@/lib/image-manifest.json';
import { STRUCTURED_DATA_IMAGE_WIDTH } from '@/lib/image-constants';

const DEFAULT_ASPECT_RATIO = 16 / 9;

export { STRUCTURED_DATA_IMAGE_WIDTH };

export function getImageIntrinsicDimensions(src: string) {
  const fromManifest = manifest[src as keyof typeof manifest];
  if (fromManifest) {
    return fromManifest;
  }

  return {
    width: STRUCTURED_DATA_IMAGE_WIDTH,
    height: Math.round(STRUCTURED_DATA_IMAGE_WIDTH / DEFAULT_ASPECT_RATIO),
  };
}

/** Scale dimensions to match a max-width image transform (downscale only; never upscale). */
export function scaleImageDimensions(
  dimensions: { width: number; height: number },
  targetWidth: number
) {
  const width = Math.min(dimensions.width, targetWidth);
  const scale = width / dimensions.width;

  return {
    width,
    height: Math.round(dimensions.height * scale),
  };
}

export function getScaledImageDimensions(src: string, targetWidth = STRUCTURED_DATA_IMAGE_WIDTH) {
  return scaleImageDimensions(getImageIntrinsicDimensions(src), targetWidth);
}
