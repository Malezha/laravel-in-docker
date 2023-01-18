# syntax=docker/dockerfile:1.2

ARG NODE_VERSION=lts
ARG NPM_VERSION=9.3.1

FROM node:${NODE_VERSION}-alpine

RUN set -x \
    && npm install -g npm@${NPM_VERSION}

RUN set -x \
    && adduser \
        --disabled-password \
        --shell "/sbin/nologin" \
        --home "/nonexistent" \
        --no-create-home \
        --uid "10001" \
        --gecos "" \
        "appuser" \
    # create directory for application sources
    && mkdir /app \
    && chown -R appuser:appuser /app

# use an unprivileged user by default
USER appuser:appuser

# use directory with application sources by default
WORKDIR /app

# copy application sources into image (completely)
COPY --chown=appuser:appuser . /app/

ENV npm_config_cache=/tmp/npmdir/cache
ENV npm_config_userconfig=/tmp/npmdir/.npmrc

RUN set -x \
    && mkdir -p /tmp/npmdir/cache \
    && chmod -R 777 /tmp/npmdir \
    && npm install \
    && rm -rf /tmp/npmdir/cache/*

ENTRYPOINT []
CMD []
