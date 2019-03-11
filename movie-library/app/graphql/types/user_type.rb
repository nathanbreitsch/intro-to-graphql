class Types::UserType < Types::BaseObject
  field :id, ID, null: false
  field :api_key, String, null: false
  field :movies, [Types::MovieType], null: true
end
