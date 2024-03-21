'use client'
import { useRef } from 'react';
import { type FC, JSX, useEffect, useState } from 'react';
import { LazyImageProps } from '../models/Image-model';
import { URL_GRAY_IMAGE } from '../constants/image-gray';

export const LazyImage: FC<LazyImageProps> = ({ src: image, onLazyLoad, ...imageProps }: LazyImageProps): JSX.Element => {

  const [src, setSrc] = useState<string>(URL_GRAY_IMAGE);
  const node = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (node.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && image) {
            setSrc(image);
            if (typeof onLazyLoad === "function") {
              onLazyLoad(node.current!);
            }
          }
        })
      })
      observer.observe(node.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [image, onLazyLoad])

  return (
    <img
      ref={node}
      src={src}
      {...imageProps}
    />
  )
}
