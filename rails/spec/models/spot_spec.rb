require "rails_helper"

RSpec.describe Spot, type: :model do
  context "factoryのデフォルト設定に従ったとき" do
    subject { create(:spot) }

    it "正常にレコードを新規作成できる" do
      expect { subject }.to change { Spot.count }.by(1)
    end
  end

  describe "Validations" do
    subject { spot.valid? }

    let(:spot) { build(:spot, name:, latitude:, longitude:, status:, user:) }
    let(:name) { Faker::Lorem.sentence }
    let(:latitude) { Faker::Address.latitude }
    let(:longitude) { Faker::Address.longitude }
    let(:status) { :published }
    let(:user) { create(:user) }
    let(:address) { Faker::Address.street_address }

    context "すべての値が正常な時" do
      it "検証が通る" do
        expect(subject).to be_truthy
      end
    end

    context "ステータスが公開済みかつ、スポット名が空の時" do
      let(:name) { "" }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsy
        expect(spot.errors.full_messages).to eq ["スポット名を入力してください"]
      end
    end

    context "ステータスが公開済みかつ、緯度がからの時" do
      let(:latitude) { "" }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsy
        expect(spot.errors.full_messages).to eq ["緯度を入力してください"]
      end
    end

    context "ステータスが公開済みかつ、経度がからの時" do
      let(:longitude) { "" }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsy
        expect(spot.errors.full_messages).to eq ["経度を入力してください"]
      end
    end

    context "ステータスが未保存かつ、すでに同一ユーザーが未保存ステータスのスポットを所有していた時" do
      let(:status) { :unsaved }
      before { create(:spot, status: :unsaved, user:) }

      it "例外が発生する" do
        expect { subject }.to raise_error(StandardError)
      end
    end
  end
end
