# Publish checklist

- [x] Capture live screenshots (hello, palette, hosting-demo production)
- [x] Upload images to `s3://serverless-image-handler-image-source/me/articles/static-hosting-for-vibe-coders/`
- [x] Branch preview screenshot (`hosting-demo-preview.png`) from live PR #2 test
- [ ] Proofread article and verify mermaid diagrams render locally (`pnpm dev-front` → http://localhost:3000/blog/static-hosting-for-vibe-coders)
- [ ] Add hero/thumbnail if a dedicated card image is preferred (`thumbnail` currently uses `hosting-demo-prod.png`)
- [ ] Set `draft: false` and pick final `date` / `lastMod`
- [ ] Optional: add screenshot of PR preview URL comment after next E2E run
