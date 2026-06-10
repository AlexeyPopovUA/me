import {
  IMAGE_PROBE_CONTAIN_WIDTH,
  IMAGE_PROBE_MAX_DIMENSION,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from '@/lib/image-constants';

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

export function getFullSizeImageURL(props: { src: string }) {
  return encodePayloadForUrl(getDefaultBucketProps(props.src));
}

export namespace getOGImageURL {
  export type Props = {
    src: string;
  };
}

export function getStructuredDataImageURL(props: {
  src: string;
  width: number;
  height: number;
}) {
  return getInsideImageURL({
    src: props.src,
    width: props.width,
    height: props.height,
    quality: 85,
  });
}

export function getOGImageURL(props: getOGImageURL.Props) {
  const {src} = props;

  const taskToEncode = {
    ...getDefaultBucketProps(src),
    edits: {
      ...getDefaultImageFormatProps(90),
      resize: {
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
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
