# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#  post_id    :integer
#
class CommentSerializer < ActiveModel::Serializer
  attributes :id, :author_id, :author_full_name, :post_id, :body, :created_at, :updated_at

  def author_full_name
    "#{self.object.author.first_name} #{self.object.author.last_name}"
  end

  belongs_to :author
end
