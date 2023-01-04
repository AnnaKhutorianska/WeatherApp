import { TImage } from "./type";

export const Image = ({ src, alt, width, height }: TImage) => {
  return <img src={src} alt={alt} width={width} height={height}/>;
};
