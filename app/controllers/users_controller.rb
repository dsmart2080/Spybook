class Api::UsersController < ApplicationController

    def index
        users = User.all
        render json: users, status: :ok
    end

    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] ||= user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end


    def show
        user = User.find_by(id: params[:id])
        render  json: user, include: ['wall_posts', 'wall_posts.comments', 'wall_posts.comments.author', 'wall_posts.likes']
    end


end
