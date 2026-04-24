import OpengraphImage from "./opengraph-image";

export const runtime = "edge";
export const alt = "Lee Mulvey - Full-stack Engineer";
export const size = {
  height: 630,
  width: 1200,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return OpengraphImage();
}
