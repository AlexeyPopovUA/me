import path from "node:path";

const BASE_URL = "https://images.oleksiipopov.com";
const BASE_PATH = "/originals/me";

export function getOriginalVideoURL(props: { src: string }) {
  return path.join(BASE_URL, BASE_PATH, props.src);
}