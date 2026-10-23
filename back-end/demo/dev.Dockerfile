# Floating Node.js 24 tag. AWS publishes security patches on this image,
# but a container function only picks them up when the image is rebuilt.
# The deployed demo Lambda uses the managed nodejs24.x runtime instead.
FROM public.ecr.aws/lambda/nodejs:24 as base-node

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en

RUN yum upgrade -y && yum clean all && rm -rf /var/cache/yum

FROM base-node as build-node

ADD ./docker-index.js ./

CMD ["docker-index.handler"]
