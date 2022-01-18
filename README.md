# FishNV API

The middle tier of the FishNV application. 

* [Database](https://github.com/WildlifeNV/fishnv-database)
* [API](#)
* [Application](https://github.com/WildlifeNV/fishnv-app-v2)
* [Infrastructure](https://github.com/WildlifeNV/apis-infrastructure)

## Getting Started 

1. You'll need the FishNV database running on your machine (or remotely).
2. Clone this repo.
3. Add a `.env` file with the following. Or to your remote database.

    ```
    DBURI=postgres://localhost:5432/fishnv
    ```

4. Run: `npm install` to install dependencies.
5. Run: `npm run dev` to start a dev server for the API.

## Deploy

This API is deployed on AWS ECS as a service. The infrastructure code [can be found here](https://github.com/WildlifeNV/apis-infrastructure). To build the infrastructure required to run the API use the AWS CDK and instructions in the Infrastructure repo.

## Contribute to FishNV API Development

*Note: This repo is part of a larger system of APIs, databases, and Applications. Each issue/pull request will need to consider any downstream or upstream effects*

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing these open source projects. In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

Contributions are made to this repo via Issues and Pull Requests (PRs). A few general guidelines that cover both:

### Issues

Issues should be used to report problems with the library, request a new feature, or to discuss potential changes before a PR is created. When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.

### Pull Requests

PRs to our libraries are always welcome and can be a quick way to get your fix or improvement slated for the next release.

For changes that address core functionality or would require breaking changes (e.g. a major release), it's best to open an Issue to discuss your proposal first. This is not required but can save time creating and reviewing changes.

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr)

1. Fork the repository to your own Github account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Commit changes to the branch
5. Following any formatting and testing guidelines specific to this repo
6. Push changes to your fork
7. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.