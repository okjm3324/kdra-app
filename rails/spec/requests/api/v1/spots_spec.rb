require "rails_helper"

RSpec.describe "Api::V1::spots", type: :request do
  describe "GET api/v1/spots" do
    subject { get(api_v1_spots_path(params)) }

    before do
      create_list(:spot, 25, status: :published)
      create_list(:spot, 8, status: :draft)
    end

    context "page を params で送信しない時" do
      let(:params) { nil }

      it "1ページ目のレコード10件取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["spots", "meta"]
        expect(res["spots"].length).to eq 10
        expect(res["spots"][0].keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res["spots"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 1
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end

    context "page を params で送信した時" do
      let(:params) { { page: 2 } }

      it "該当ページ目のレコード10件取得できる" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["spots", "meta"]
        expect(res["spots"].length).to eq 10
        expect(res["spots"][0].keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
        expect(res["spots"][0]["user"].keys).to eq ["name"]
        expect(res["meta"].keys).to eq ["current_page", "total_pages"]
        expect(res["meta"]["current_page"]).to eq 2
        expect(res["meta"]["total_pages"]).to eq 3
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/spots/:id" do
    subject { get(api_v1_spot_path(spot_id)) }

    let(:spot) { create(:spot, status:) }

    context "spot_id に対応する spots レコードが存在する時" do
      let(:spot_id) { spot.id }

      context "stpos レコードのステータスが公開中の時" do
        let(:status) { :published }

        it "正常にレコードを取得できる" do
          subject
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["id", "name", "latitude", "longitude", "address", "created_at", "status", "user"]
          expect(res["user"].keys).to eq ["name"]
          expect(response).to have_http_status(:ok)
        end
      end

      context "spots レコードのステータスが下書きの時" do
        let(:status) { :draft }

        it "ActiveRecord::RecordNotFound エラーが返る" do
          expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end

    context "spot_id に対応する spots レコードが存在しない時" do
      let(:spot_id) { 10_000_000_000 }

      it "ActiveRecord::RecordNotFound エラーが返る" do
        expect { subject }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
