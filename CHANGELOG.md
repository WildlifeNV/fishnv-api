# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2022-01-18

### Changed

* Updated Dockerfile to use `node:16.13.2-alpine3.14`. This overcomes an earlier Docker engine issue when building cross platform containers. [See here](https://github.com/docker/for-mac/issues/5831).

## [2.0.0] - 2022-01-18

This is the initial release of v2 of the FishNV API. It is a complete rewrite with using some ideas and methods I've learned when building the HuntNV API. 