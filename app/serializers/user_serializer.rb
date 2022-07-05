# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  birthday        :date
#  email           :string
#  first_name      :string
#  friends_list    :text             default("")
#  gender          :string
#  last_name       :string
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class UserSerializer < ActiveModel::Serializer
  attributes(
    :id, :first_name, :last_name, :email, :gender,
    :birthday, :created_at, :updated_at, :friends_list, :friends_full_names,
    :profile_picture_url, :cover_photo_url
  )

  def friends_full_names
    self.object.friends.map do |friend|
      "#{friend.first_name} #{friend.last_name}"
    end
  end

  has_many :wall_posts

  has_many :assertive_friendships

  def profile_picture_url
    if self.object.profile_picture.attached?
      Rails.application.routes.url_helpers.url_for(self.object.profile_picture)
    end
  end

  def cover_photo_url
    if self.object.cover_photo.attached?
      Rails.application.routes.url_helpers.url_for(self.object.cover_photo)
    end
  end

end
