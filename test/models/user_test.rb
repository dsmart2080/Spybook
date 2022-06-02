# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string
#  last_name       :string
#  email           :string
#  password_digest :string
#  gender          :string
#  birthday        :date
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  friends_list    :text             default("")
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
