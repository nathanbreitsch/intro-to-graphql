module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :add_movie_to_library, mutation: Mutations::AddMovieToLibrary
  end
end
