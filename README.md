## Instructions how to use GIT

- Three main branchs: main, stage, develop
  - The main branch is all code is in production
  - The stage branch is all code is in stage
  - The develop branch is the branch you will based to create the branch feature and the develop branch you will open the PR'S(pull requests)
- When you will start a new feature you need create the branch feature based develop branch. For example:

```
    git checkout develop                  // Access the develop branch
    git pull origin develop               // Download all modifications in develop branch for you develop branch locally.
    git checkout -b feature/create-feeds  // Create branch feature/create-features based develop branch
```

- You need to write the commit message in english with short description about what you did. For example:

```
    git commit -m "feat: add endpoint to allow create feed"
```

## Instructions how to open PR

- First finished your task in your branch feature
- Push the code to remote repository
- Access repository on Github
- Access your branch feature
- Open PR(pull request) for branch **develop**. Case you have doubt how to do it, [click here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## Test branch protection
