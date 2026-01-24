'use client';

import React, { CSSProperties, useCallback, useMemo, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

import './thumbnail-client-image.css';

type Props = ImageProps & {
  // overridden as required
  blurDataURL: string;
  width: number;
  height: number;
};

export function ThumbnailImageClient(props: Props) {
  const [loaded, setLoaded] = useState(false);
  const onImageLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const classNameBlurred = clsx(props.className, `thumbnail-client-image absolute w-full h-full left-0 right-0 top-0 bottom-0 z-0`);
  const classNameFinal = clsx(props.className, `thumbnail-client-image absolute w-full h-full left-0 right-0 top-0 bottom-0 z-10`);

  const commonCfg: Partial<ImageProps> = useMemo(
    () => ({
      width: props.width,
      height: props.height,
      loading: props.loading,
      priority: props.priority,
      style: {},
    }),
    [props.priority, props.width, props.height, props.loading],
  );

  const blurImageStyle: CSSProperties = useMemo(
    () => ({
      ...commonCfg.style,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }),
    [commonCfg.style],
  );

  const normalImageStyle: CSSProperties = useMemo(
    () => ({
      ...commonCfg.style,
      opacity: loaded ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }),
    [commonCfg.style, loaded],
  );

  return (
    <div onClick={props.onClick} className="relative w-full h-full">
      <Image
        {...commonCfg}
        aria-hidden={true}
        className={classNameBlurred}
        src={props.blurDataURL}
        style={blurImageStyle}
        alt={props.alt}
        unoptimized={true}
      />
      <Image
        {...commonCfg}
        loader={props.loader}
        className={classNameFinal}
        onLoad={onImageLoad}
        quality={props.quality}
        src={props.src}
        sizes={props.sizes}
        style={normalImageStyle}
        unoptimized={props.unoptimized}
        alt={props.alt}
      />
    </div>
  );
}
