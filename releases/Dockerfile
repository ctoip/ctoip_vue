From nginx:1.22.1
MAINTAINER Aurora

ENV HTMLPATH /usr/share/nginx/html
ENV NGINXPATH /etc/nginx
WORKDIR $HTMLPATH

RUN sed -i "s@http://deb.debian.org@https://mirrors.163.com@g" /etc/apt/sources.list \
    && apt-get update \
    && apt-get install --no-install-recommends --no-install-suggests -y wget \
    && cd ${HTMLPATH} \
    && wget -O dist.tar.gz  https://github.com/Dew-OF-Aurora/ctoip_vue/releases/download/dist/dist.tar.gz \
    && tar -xzvf dist.tar.gz \
    && cd ${NGINXPATH} \
    && mv nginx.conf nginx.conf.bak \
    && wget -O tmpnginx.conf https://github.com/Dew-OF-Aurora/ctoip_vue/releases/download/dist/nginx.conf \
    && envsubst '${HTMLPATH}' < tmpnginx.conf > nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]