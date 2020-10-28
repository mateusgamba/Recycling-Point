import NodeGeocoder from "node-geocoder";

const geo = async (address: any) => {
  const geocoder = NodeGeocoder({
    provider: process.env.GET_PROVIDER?.toString() as NodeGeocoder.Providers,
    apiKey: process.env.GET_APIKEY
  });

  return await geocoder.geocode(address);
}

export default geo;