import Jimp from "jimp";

const BASE_URL = "https://images.oleksiipopov.com";
const BUCKET = "serverless-image-handler-image-source";
const BASE_PATH = "me";
const DEFAULT_IMAGE_QUALITY = 75;

function getDefaultBucketProps(src: string) {
  return {
    bucket: BUCKET,
    key: `${BASE_PATH}${src}`
  };
}

function getDefaultImageFormatProps(quality: number) {
  return {
    webp: {
      quality
    },
    png: {
      quality
    },
    jpg: {
      quality
    }
  };
}

function encodePayloadForUrl(configuration: { [key: string]: unknown }) {
  return `${BASE_URL}/${btoa(JSON.stringify(configuration))}`;
}

export namespace getContainImageURL {
  export type Props = {
    src: string;
    width: number;
    height?: number;
    quality?: number;
    position?: string;
  };
}

export function getContainImageURL(props: getContainImageURL.Props) {
  const {src, width, height, quality = DEFAULT_IMAGE_QUALITY, position = 'centre'} = props;

  const taskToEncode = {
    ...getDefaultBucketProps(src),
    edits: {
      ...getDefaultImageFormatProps(quality),
      resize: {
        width,
        height,
        fit: 'contain',
        position,
      },
    },
  };

  return encodePayloadForUrl(taskToEncode);
}

export namespace getCoverImageURL {
  export type Props = {
    src: string;
    width: number;
    height: number;
    quality?: number;
    position?: string;
  };
}

export function getCoverImageURL(props: getCoverImageURL.Props) {
  const {src, width, height, quality = DEFAULT_IMAGE_QUALITY, position = 'centre'} = props;

  const taskToEncode = {
    ...getDefaultBucketProps(src),
    edits: {
      ...getDefaultImageFormatProps(quality),
      resize: {
        width,
        height,
        fit: 'cover',
        position,
      },
    },
  };

  return encodePayloadForUrl(taskToEncode);
}

export namespace getFillImageURL {
  export type Props = {
    src: string;
    width: number;
    height: number;
    quality?: number;
  };
}

export function getFillImageURL(props: getFillImageURL.Props) {
  const {src, width, height, quality = DEFAULT_IMAGE_QUALITY} = props;

  const taskToEncode = {
    ...getDefaultBucketProps(src),
    edits: {
      ...getDefaultImageFormatProps(quality),
      resize: {
        width,
        height,
        fit: 'fill',
      },
    },
  };

  return encodePayloadForUrl(taskToEncode);
}

export namespace getInsideImageURL {
  export type Props = {
    src: string;
    width: number;
    height: number;
    quality?: number;
  };
}

export function getInsideImageURL(props: getInsideImageURL.Props) {
  const {src, width, height, quality = DEFAULT_IMAGE_QUALITY} = props;

  const taskToEncode = {
    ...getDefaultBucketProps(src),
    edits: {
      ...getDefaultImageFormatProps(quality),
      resize: {
        width,
        height,
        fit: 'inside',
      },
    },
  };

  return encodePayloadForUrl(taskToEncode);
}

export namespace getOGImageURL {
  export type Props = {
    src: string;
  };
}

export function getOGImageURL(props: getOGImageURL.Props) {
  const {src} = props;

  const taskToEncode = {
    ...getDefaultBucketProps(src),
    edits: {
      ...getDefaultImageFormatProps(90),
      resize: {
        width: 1200,
        height: 630,
        fit: "contain"
      }
    }
  };

  return encodePayloadForUrl(taskToEncode);
}

export function generateLBSlides(images: string[]) {
  const width = 2160;
  const quality = 85;

  return images.map((image) => ({
    src: getContainImageURL({src: image, quality, width}),
    width,
    srcSet: [width, 1080, 640, 410, 344, 256].map((breakpoint) => ({
      width: breakpoint,
      src: getContainImageURL({src: image, quality, width: breakpoint})
    })),
  }));
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
        quality: 100
      },
      resize: {
        // should be relatively big to determine the ratio w/o effect of internal numbers rounding
        width: 100
      }
    }
  });

  const blob = await (await fetch(url)).arrayBuffer();
  const imgData = await Jimp.read(Buffer.from(blob));
  return imgData.getWidth() / imgData.getHeight();
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
  const blob = await (await fetch(payloadURL)).arrayBuffer();
  const imgData = await Jimp.read(Buffer.from(blob));
  return imgData.getBase64Async(-1);
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
