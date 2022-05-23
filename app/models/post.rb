class Post < ApplicationRecord
    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User
    
    has_many :comments,
        primary_key: :id,
        forieng_key: :post_id,
        class_name: :Comment
    
    has_many :likes,
        primary_key: :id,
        foreign_key: :post_id,
        class_name: :Comment

        


end
