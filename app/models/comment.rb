# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  author_id  :integer
#  post_id    :integer
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord

    belongs_to :author,
      primary_key: :id,
      foreign_key: :author_id,
      class_name: :User
  
    belongs_to :post,
      primary_key: :id,
      foreign_key: :post_id,
      class_name: :Post
  
  end
  