const BASE_URL = "https://dqdoi2i9o4m2u.cloudfront.net";
const BUCKET = "serverless-image-handler-image-source";
const BASE_PATH = "me";

type Props = {
    src: string;
    width: number;
    height: number;
    quality: number;
}


export const getCroppedImageURL = (props: Props) => {
    const { src, width, height, quality } = props;

    const encodedTask = {
        "bucket": BUCKET,
        "key": `${BASE_PATH}${src}`,
        "edits": {
            "resize": {
                "width": width,
                "height": height,
                "fit": "cover"
            },
            webp: {
                quality
            },
            png: {
                quality
            },
            jpg: {
                quality
            }
        }
    };

    const stringifiedObject = JSON.stringify(encodedTask);
    const encodedObject = btoa(stringifiedObject);

    return `${BASE_URL}/${encodedObject}`
}
