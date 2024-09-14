import path from "node:path";

const BASE_URL = "https://images.oleksiipopov.com";
const BASE_PATH = "/originals/me";

export function getOriginalVideoURL(props: { src: string }) {
  const urlCfg = new URL(BASE_URL);
  urlCfg.pathname = path.join(BASE_PATH, props.src);

  return urlCfg.toString();
}