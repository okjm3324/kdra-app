import { useEffect, useState } from 'react'
//韓国の現在地を取得する{lat,lng}を返す
const useLocationWithFallback = () => {
  const [startLocation, setStartLocation] = useState({ lat: 0, lng: 0 })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords
      try {
        // 逆ジオコーディングAPIを使用して国を判定
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
        )
        const data = await res.json()
        const country = data.results[0].address_components.find((comp: any) =>
          comp.types.includes('country'),
        ).short_name
        // 日本であればソウル駅の座標を使用
        if (country === 'JP') {
          latitude = 37.5563 // ソウル駅の緯度
          longitude = 126.9723 // ソウル駅の経度
        }
      } catch (error) {
        console.error('逆ジオコーディングAPIの呼び出しに失敗しました', error)
      }
      setStartLocation({ lat: latitude, lng: longitude })
    })
  }, [])
  return startLocation
}

export default useLocationWithFallback
