var _ = require('lodash');

const downcaseObject = (obj) => (
  _.transform(obj, function (result, val, key) {
      result[key.toLowerCase()] = val;
  })
)

module.exports = {
  downcaseObject
}

