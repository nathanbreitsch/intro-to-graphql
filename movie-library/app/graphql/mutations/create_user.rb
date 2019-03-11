class Mutations::CreateUser < Mutations::BaseMutation
  field :user, Types::UserType, null: false

  def resolve
    user = User.create!

    { user: user }
  end
end
