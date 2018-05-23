FROM node:8.1.4-alpine
RUN rm -f ~/.npmrc
COPY .npmrc ~/
RUN sh -c 'printf "172.17.0.1     bpi.unitas.com" >> /etc/hosts' && cat /etc/hosts
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN ls -l /usr/src/app
RUN tar -zxf node_modules.tar.gz
RUN rm node_modules.tar.gz
RUN npm run build-prod
EXPOSE 3331
CMD npm run start-${REACT_ENV}
