import IP2Region from 'ip2region';
const query = new IP2Region();

export const getLocationByIp = (ip: string) => {
  return query.search(ip);
};
