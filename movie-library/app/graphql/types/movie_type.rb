class Types::MovieType < Types::BaseObject
  field :id, ID, null: false
  field :title, String, null: false
  field :user, Types::UserType, null: false
end
