FactoryBot.define do
  factory :spot do
    user
    name { Faker::Lorem.sentence }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    status { :published }
    address { Faker::Address.street_address }
  end
end
