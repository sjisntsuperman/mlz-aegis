FROM registry-vpc.cn-hangzhou.aliyuncs.com/codemaohub/codemao-master:11-onbuild

# Workdir is unprivileged user home
WORKDIR /usr/src/app

# Copy Codes
COPY . /usr/src/app/

RUN chown -R codemao.codemao .
RUN chown codemao.codemao -R /srv

# Download qshell
RUN mkdir /srv/qiniu && \
  curl -o /srv/qiniu/qshell https://ops-files.codemao.cn/qshell && \
  chmod -R +x /srv/qiniu

# Switch to unprivileged user
USER codemao

# Check node version
RUN node -v

# Install node dependencies, don't modify lockfile
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

# Upload QN
ARG QN_AKEY=''
ARG QN_SKEY=''
RUN echo "⏫⏫⏫ UPLOAD FILES TO QINIU SERVER"
RUN ./bin/upload.sh

# Entry point
ENTRYPOINT ["npm","run"]
CMD ["production"]
