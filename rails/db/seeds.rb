ActiveRecord::Base.transaction do
  user1 = User.create!(name: "テスト太郎", email: "test1@example.com", password: "password", confirmed_at: Time.current)

  user2 = User.create!(name: "テスト次郎", email: "test2@example.com", password: "password", confirmed_at: Time.current)

  15.times do |i|
    Spot.create!(name: "テストタイトル1-#{i}", longitude: 333333333.3333, latitude: 66666.66666, address: "安養#{i}", status: :published, user: user1)
    Spot.create!(name: "テストタイトル2-#{i}", longitude: 333333333.3333, latitude: 66666.66666, address: "安養#{i}", status: :published, user: user2)
  end
end