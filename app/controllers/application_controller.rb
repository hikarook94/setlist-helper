# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  # Deviseコントローラーが使われる場合に、ストロングパラメーターを設定する
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # ストロングパラメーターの設定
  def configure_permitted_parameters
    # サインアップ時にusernameを許可
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    # アカウント編集時にusernameを許可
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
