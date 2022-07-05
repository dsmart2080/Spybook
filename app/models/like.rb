# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  likeable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  liker_id      :integer
#  post_id       :integer
#



class Like < ApplicationRecord
    validates :post_id, :likeable_type, :liker_id, presence:true
    validates :liker_id, uniqueness: {scope: [:post_id, :likeable_type]}

    #Allows for liking comment of a comment
    belongs_to :likeable,
      polymorphic: true

    belongs_to :liker,
      primary_key: :id,
      foreign_key: :liker_id,
      class_name: :User
    
    belongs_to :post,
      primary_key: :id,
      foreign_key: :post_id,
      class_name: :Post
  
  end
  
