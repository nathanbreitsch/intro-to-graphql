class Types::MovieType < Types::BaseObject
  key fields: 'id'
  field :id, ID, null: false
  field :title, String, null: false
  field :user, Types::UserType, null: false
end
