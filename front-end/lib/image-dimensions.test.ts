import { describe, expect, it } from 'vitest';

import { scaleImageDimensions } from '@/lib/image-dimensions';

describe('scaleImageDimensions', () => {
  it('downscales wide images to the target width', () => {
    expect(scaleImageDimensions({ width: 1536, height: 1024 }, 1200)).toEqual({
      width: 1200,
      height: 800,
    });
  });

  it('keeps narrow images at intrinsic width without upscaling', () => {
    expect(scaleImageDimensions({ width: 1024, height: 1536 }, 1200)).toEqual({
      width: 1024,
      height: 1536,
    });
  });
});
