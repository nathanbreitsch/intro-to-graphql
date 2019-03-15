const { RESTDataSource } = require('apollo-datasource-rest')

module.exports = class ImdbApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.omdbapi.com'
  }

  willSendRequest(request) {
    request.params.set('apikey', process.env.OMDB_API_KEY);
  }

  async getMetadata(title) {
    return this.get(`?t=${title}`)
  }
}
