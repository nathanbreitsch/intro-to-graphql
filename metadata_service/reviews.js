const faker = require("faker");

module.exports = movie => {
  let rating = Math.floor(Math.random() * 6);
  let comment;

  switch (rating) {
    case 0: {
      comment = `There was nothing good about ${movie}`;
      break;
    }
    case 1: {
      comment = `${movie} was bad`;
      break;
    }
    case 2: {
      comment = `I didn't think ${movie} was very good`;
      break;
    }
    case 3: {
      comment = `${movie} was ok`;
      break;
    }
    case 4: {
      comment = `I enjoyed ${movie}`;
      break;
    }
    case 5: {
      comment = `Wow! ${movie} was great`;
      break;
    }
  }

  return {
    rating,
    comment,
    reviewer: {
      name: faker.name.findName(),
      emailAddress: faker.internet.email()
    }
  };
};
