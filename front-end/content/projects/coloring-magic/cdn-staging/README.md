# Coloring Magic Art portfolio screenshots

Upload these PNGs to the image CDN source bucket:

- `s3://serverless-image-handler-image-source/me/projects/coloring-magic/coloring-magic-home.png`
- `s3://serverless-image-handler-image-source/me/projects/coloring-magic/coloring-magic-blog.png`
- `s3://serverless-image-handler-image-source/me/projects/coloring-magic/coloring-magic-pricing.png`

Captured at viewport 1440×900 with device pixel ratio 2 (2880×1800). Remove `me/projects/coloring-magic/coloring-magic-article.png` from the bucket after uploading `coloring-magic-pricing.png`.

After upload, run `pnpm --filter front-end sync-image-dimensions` to refresh `lib/image-manifest.json` if dimensions differ.