class Mutations::AddMovieToLibrary < Mutations::BaseMutation
  argument :title, String, required: true

  field :movie, Types::MovieType, null: false

  def resolve(title:)
    movie = Movie.create!(user: context[:current_user],
                          title: title)

    { movie: movie }
  end
end
