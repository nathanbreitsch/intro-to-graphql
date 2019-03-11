class User < ApplicationRecord
  has_many :movies

  before_create :assign_api_key

  def assign_api_key
    self.api_key = SecureRandom.uuid

    true
  end
end
