module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    
    field :get_movies, [Types::MovieType], null: true

    def get_movies
      context[:current_user].movies.all
    end
  end
end
