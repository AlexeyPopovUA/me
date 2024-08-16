# TODO List

- [x] "How" section
- [ ] Serverless image handler from AWS Solutions
- [ ] Static exported website with Next.js
- [ ] nextjs/image with loader and base64 data url for a blurred placeholder


* Explain the problem of having images in Next.js
    * No image optimization support for statically exported web apps like in Gatsby.js
    * Image transformation Costs of 3rd party SaaS like Vercel or Cloudinary can go high

* Describe self-hosted serverless image handler from AWS Solutions
  * What it offers
  * What is missing
    * CDN custom domain name
    * Hosting cache and viewer policies control
    * Image metadata information retrieval
    * Convenient image maintenance
  * How to add the missing parts

* Explain a Next.js static web app setup, integrated with serverless image handler
    * Next.js app build settings
    * Image loader
    * Blurred image
    * Size retrieval
    * Optimized image
    * Image loading animation

* Show the demo

* Conclusions

