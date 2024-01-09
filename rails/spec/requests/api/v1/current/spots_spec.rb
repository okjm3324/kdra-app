require "rails_helper"

RSpec.describe "Api::V1::Current::Spots", type: :request do
  describe "GET api/v1/current/spots" do
    subject { get(api_v1_current_spots_path, headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:other_user) { create(:user) }

    before { create_list(:spot, 2, user: other_user) }

    context "ログインユーザーに紐づく spots レコードが存在する時" do
      before { create_list(:spot, 3, user: current_user) }

      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 3
        expect(res[0].keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res[0]["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "ログインユーザーに紐づく spots レコードが存在しない時" do
      it "空の配列が返る" do
        subject
        res = JSON.parse(response.body)
        expect(res).to eq []
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/current/spots/:id" do
    subject { get(api_v1_current_spot_path(id), headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context ":id がログインユーザーに紐づく spots レコードの id である時" do
      let(:current_user_spot) { create(:spot, user: current_user) }
      let(:id) { current_user_spot.id }

      it "正常にレコードを取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    context ":id がログインユーザーに紐づく spots レコードの id ではない時" do
      let(:other_user_spot) { create(:spot) }
      let(:id) { other_user_spot.id }

      it "例外が発生する" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "POST api/v1/current/spots" do
    subject { post(api_v1_current_spots_path, headers:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    context "ログインユーザーに紐づく未保存ステータスの記事が0件の時" do
      it "未保存ステータスの記事が新規作成される" do
        expect { subject }.to change { current_user.spots.count }.by(1)
        expect(current_user.spots.last).to be_unsaved
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    context "ログインユーザーに紐づく未保存ステータスの記事が1件の時" do
      before { create(:spot, user: current_user, status: :unsaved) }

      it "未保存ステータスの記事が新規作成される" do
        expect { subject }.not_to change { current_user.spots.count }
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "PATCH api/v1/current/articles" do
    subject { patch(api_v1_current_spot_path(id), headers:, params:) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:params) { { "spot": { "name": "テストタイトル2", "latitude": 88888.88, "longitude": 999.999, address: "安養", "status": "published" } } }

    context ":id がログインユーザーに紐づく spots レコードの id である時" do
      let(:current_user_spot) { create(:spot, name: "テストタイトル1", latitude: 111.111, longitude: 222.222, address: "ソウル駅", status: :draft, user: current_user) }
      let(:id) { current_user_spot.id }

      it "正常にレコードを更新できる" do
        expect { subject }.to change { current_user_spot.reload.name }.from("テストタイトル1").to("テストタイトル2") and
          change { current_user_spot.reload.latitude }.from(8888.88).to(777.777) and
          change { current_user_spot.reload.longitude }.from(999.999).to(666.666) and
          change { current_user_spot.reload.address }.from("安養").to("ソウル駅") and
          change { current_user_spot.reload.status }.from("draft").to("published")
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res["user"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end

    context ":id がログインユーザーに紐づく spots レコードの id ではない時" do
      let(:other_user_spot) { create(:spot, user: other_user) }
      let(:id) { other_user_spot.id }

      it "例外が発生する" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
