class Image
  Aws.config.update(
   region: 'ap-northeast-1' ,
   credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
  )

  def self.signed_url(filename, operation)
    signer = Aws::S3::Presigner.new
    signer.presigned_url(operation, bucket: ENV['S3_BUCKET_NAME'], key: filename)
  end
  #画像を取得する
  def self.cdn_url(filename)
    "#{ENV['CLOUDFRONT_ORIGIN']}/#{filename}"
  end
end