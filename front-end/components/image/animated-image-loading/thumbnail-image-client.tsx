'use client';

import React, {CSSProperties, useCallback, useMemo, useState} from 'react';
import Image, {ImageProps} from 'next/image';
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

  const classNameBlurred = clsx(props.className, `thumbnail-client-image`);
  const classNameFinal = clsx(props.className, `thumbnail-client-image absolute left-0 top-0 z-0`);

  const commonCfg: Partial<ImageProps> = useMemo(
    () => ({
      width: props.width,
      height: props.height,
      loading: props.loading,
      priority: props.priority,
      onClick: props.onClick
    }),
    [props.width, props.height, props.loading, props.priority, props.onClick],
  );

  const blurredImageStyle = commonCfg.style;

  const normalImageStyle: CSSProperties = useMemo(
    () => ({
      ...commonCfg.style,
      opacity: loaded ? 1 : 0,
    }),
    [commonCfg.style, loaded],
  );

  return (
    <>
      <Image
        {...commonCfg}
        aria-hidden={true}
        className={classNameBlurred}
        src={props.blurDataURL}
        style={blurredImageStyle}
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
    </>
  );
}
