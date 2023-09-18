# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :setlists, dependent: :delete_all
  has_many :songs, dependent: :delete_all
  has_many :scores, dependent: :delete_all
end
