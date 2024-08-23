import React from 'react';
import clsx from 'clsx';
import { ImageProps } from 'next/image';

import { ThumbnailImageClient } from './thumbnail-image-client';

type Props = ImageProps & {
  // overridden as required
  blurDataURL: string;
  width: number;
  height: number;
  // custom
  imageClassName?: string;
};

export function ThumbnailImage(props: Props) {
  return (
    <div className={clsx(props.className, `relative overflow-hidden`)}>
      <ThumbnailImageClient
        blurDataURL={props.blurDataURL}
        width={props.width}
        height={props.height}
        loader={props.loader}
        loading={props.loading}
        unoptimized={props.unoptimized}
        quality={props.quality}
        priority={props.priority}
        onLoad={props.onLoad}
        onError={props.onError}
        src={props.src}
        sizes={props.sizes}
        onClick={props.onClick}
        className={props.imageClassName}
        alt={props.alt}
      />
    </div>
  );
}
