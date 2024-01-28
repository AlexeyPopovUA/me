import type {Slide} from "yet-another-react-lightbox";

const BASE_URL = "https://dqdoi2i9o4m2u.cloudfront.net";
const BUCKET = "serverless-image-handler-image-source";
const BASE_PATH = "me";
const DEFAULT_IMAGE_QUALITY = 75;

type Props = {
    src: string;
    width: number;
    height?: number;
    quality?: number;
};

const getDefaultBucketProps = (src: string) => ({
    bucket: BUCKET,
    key: `${BASE_PATH}${src}`
});

const getDefaultImageFormatProps = (quality: number) => ({
    webp: {
        quality
    },
    png: {
        quality
    },
    jpg: {
        quality
    }
});

const encodePayloadForUrl = (configuration: {[key: string]: unknown}) => `${BASE_URL}/${btoa(JSON.stringify(configuration))}`;

export const getCoverImageURL = (props: Props) => {
    const { src, width, height, quality = DEFAULT_IMAGE_QUALITY } = props;

    const taskToEncode = {
        ...getDefaultBucketProps(src),
        edits: {
            ...getDefaultImageFormatProps(quality),
            resize: {
                width,
                height,
                fit: "cover"
            }
        }
    };

    return encodePayloadForUrl(taskToEncode);
}

export const getContainImageURL = (props: Props) => {
    const { src, width, quality = DEFAULT_IMAGE_QUALITY } = props;

    const taskToEncode = {
        ...getDefaultBucketProps(src),
        edits: {
            ...getDefaultImageFormatProps(quality),
            resize: {
                width,
                fit: "contain"
            }
        }
    };

    return encodePayloadForUrl(taskToEncode);
}

export const getInsideImageURL = (props: Props) => {
    const { src, width, quality = DEFAULT_IMAGE_QUALITY } = props;

    const taskToEncode = {
        ...getDefaultBucketProps(src),
        edits: {
            ...getDefaultImageFormatProps(quality),
            resize: {
                width,
                fit: "inside"
            }
        }
    };

    return encodePayloadForUrl(taskToEncode);
}

export const generateLBSlides = (images: string[]): Slide[] => {
    const width = 2048;

    // TODO Why???
    // @ts-ignore
    return images.map((image) => ({
        src: getContainImageURL({src: image, quality: 85, width}),
        width,
        srcSet: [2160, 1080, 640, 410, 344, 256].map((breakpoint) => ({
            width: breakpoint,
            src: getContainImageURL({src: image, quality: 85, width: breakpoint})
        })),
    }));
};
