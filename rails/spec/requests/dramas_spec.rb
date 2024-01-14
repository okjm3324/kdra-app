require 'rails_helper'

RSpec.describe "Dramas", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/dramas/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/dramas/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/dramas/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /search_drama" do
    it "returns http success" do
      get "/dramas/search_drama"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /delete" do
    it "returns http success" do
      get "/dramas/delete"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/dramas/update"
      expect(response).to have_http_status(:success)
    end
  end

end
