export const haversineInKM = (
  centerLatitude,
  centerLongitude,
  itemLatitude,
  itemLatitudeLongitude
) => {
  const radiusCenterLatitude = (Math.PI * centerLatitude) / 180;
  const radiusItemLatitude = (Math.PI * itemLatitude) / 180;
  const theta = centerLongitude - itemLatitudeLongitude;
  const radiusTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radiusCenterLatitude) * Math.sin(radiusItemLatitude) +
    Math.cos(radiusCenterLatitude) *
      Math.cos(radiusItemLatitude) *
      Math.cos(radiusTheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1.609344;

  return dist;
};
