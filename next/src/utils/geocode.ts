export const reverseGeocode = async (lat: number, lng: number) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=kr`,
  )
  const data = await res.json()
  return data.results[0].formatted_address
}
