# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  friend_id  :integer
#  user_id    :integer
#
class FriendshipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friend_id, :created_at, :updated_at

  belongs_to :friend
end
