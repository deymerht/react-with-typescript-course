import { type ImgHTMLAttributes } from 'react';

export interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLazyLoad?: (img: HTMLImageElement) => void;
}
