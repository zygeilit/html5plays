
FROM zygeilit/centos7

COPY ./service/ ~/service/

WORKDIR ~/service

RUN npm install

EXPOSE 3000

ENTRYPOINT forever -c 'node --harmony' bin/www
