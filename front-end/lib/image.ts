import Jimp from "jimp";

const BASE_URL = "https://images.oleksiipopov.com";
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

const encodePayloadForUrl = (configuration: {
    [key: string]: unknown
}) => `${BASE_URL}/${btoa(JSON.stringify(configuration))}`;

export const getContainImageURL = (props: Props) => {
    const {src, width, height, quality = DEFAULT_IMAGE_QUALITY} = props;

    const taskToEncode = {
        ...getDefaultBucketProps(src),
        edits: {
            ...getDefaultImageFormatProps(quality),
            resize: {
                width,
                height,
                fit: "contain"
            }
        }
    };

    return encodePayloadForUrl(taskToEncode);
}

type OGImageURLProps = {
    src: string;
};
export const getOGImageURL = (props: OGImageURLProps) => {
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

export const generateLBSlides = (images: string[]) => {
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
};

export const getBlurredImageURL = (props: { src: string }) =>
    encodePayloadForUrl({
        ...getDefaultBucketProps(props.src),
        edits: {
            png: {
                quality: 10
            },
            resize: {
                width: 10,
                fit: "inside"
            }
        }
    })

export const readImageBase64AndInfo = async (src: string) => {
    const blob = await (await fetch(src)).arrayBuffer();
    const imgData = await Jimp.read(Buffer.from(blob));
    const url = await imgData.getBase64Async(-1);

    return {
        blurDataURL: url,
        ratio: imgData.getWidth() / imgData.getHeight()
    }
}

export const readBlurredImageSrcPair = async ({src}: { src: string; }) => {
    const {blurDataURL, ratio} = await readImageBase64AndInfo(getBlurredImageURL({src}));
    return ({
        src,
        ratio,
        blurDataURL: blurDataURL
    });
};
