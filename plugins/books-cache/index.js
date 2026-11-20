// index.js

// Before the build runs,
// restore a directory we cached in a previous build.
// Does not do anything if:
//  - the directory already exists locally
//  - the directory has never been cached
export const onPreBuild = async ({ utils }) => {
  await utils.cache.restore('./.cache');
}

// After the build is done,
// cache directory for future builds.
// Does not do anything if:
//  - the directory does not exist
export const onPostBuild = async ({ utils }) => {
    await utils.cache.save('./.cache')
}