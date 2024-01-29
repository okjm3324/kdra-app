const getHeaders = () => {
  const accessToken = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  // 認証情報をヘッダーに設定
  const authHeaders = {
    'access-token': accessToken,
    client,
    uid,
  }
  return authHeaders
}

export default getHeaders
