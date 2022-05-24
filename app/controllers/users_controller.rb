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

    def attach_new_profile_picture
        user = User.find_by(id: params[:id])
        if user.profile_picture.attached?
            user.profile_picture.purge_later
        end

        user.profile_picture.attach(params[:profile_picture])
        render json: user, include: ['wall_posts', 'wall_posts.comments', 'wall_posts.comments', 'wall_posts.likes', 'wall_posts.author','assertive_friendships']
    end


    def attach_new_cover_photo
        user = User.find_by(id: params[:id])
        if user.cover_photo.attached?
            user.cover_photo.purge_later
        end

        user.cover_photo.attach(params[:cover_photo])
        render json: user, include: ['wall_posts', 'wall_posts.comments','wall_posts.comments.author', 'wall_posts.likes', 'wall_posts.author', 'assertive_friendships']
    end

end
