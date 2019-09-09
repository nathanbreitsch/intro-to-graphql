const fetch = require("node-fetch");
const { downcaseObject } = require("./utilities");
const generateReview = require("./reviews");

const getReviews = number => ({ title }) =>
  Array(number)
    .fill(true)
    .map(_ => ({
      ...generateReview(title),
      internalId: Math.floor(Math.random() * 3)
    }));

const getMetadata = async ({ title }) => {
  let url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${
    process.env.OMDB_API_KEY
  }`;

  let metadata = await fetch(url).then(res => res.json());

  if (metadata["Response"] !== "False") {
    metadata["Actors"] = metadata["Actors"].split(",").map(a => a.trim());
    metadata["Ratings"] = metadata["Ratings"].map(r => downcaseObject(r));
  }

  return downcaseObject(metadata);
};

module.exports = { getReviews, getMetadata };
