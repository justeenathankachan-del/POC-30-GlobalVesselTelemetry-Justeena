export type VesselClass = 'Container' | 'Bulk Carrier' | 'Tanker' | 'Ro-Ro';
export type MaritimeCorridor = 'Asia-Pacific' | 'Europe-Med' | 'North America' | 'Middle East';
export type CongestionStatus = 'Severe Congestion' | 'Moderate Delay' | 'Normal Flow';

export interface PortFacility {
  id: string;
  name: string;
  country: string;
  corridor: MaritimeCorridor;
  lat: number;
  lng: number;
  activeVessels: number;
  anchoredQueue: number;
  avgDwellHours: number;
  congestionIndex: number;
  status: CongestionStatus;
  dominantVesselClass: VesselClass;
  annualTeuMillions: number;
}

export const PORTS_DATA: PortFacility[] = [
  // Asia-Pacific (11 hubs)
  { id: 'CNSHA', name: 'Port of Shanghai (Yangshan)', country: 'China', corridor: 'Asia-Pacific', lat: 30.6265, lng: 122.065, activeVessels: 342, anchoredQueue: 68, avgDwellHours: 64.5, congestionIndex: 88, status: 'Severe Congestion', dominantVesselClass: 'Container', annualTeuMillions: 49.1 },
  { id: 'SGSIN', name: 'Port of Singapore (Tuas)', country: 'Singapore', corridor: 'Asia-Pacific', lat: 1.2644, lng: 103.822, activeVessels: 295, anchoredQueue: 49, avgDwellHours: 52.0, congestionIndex: 81, status: 'Severe Congestion', dominantVesselClass: 'Container', annualTeuMillions: 39.0 },
  { id: 'CNNGB', name: 'Port of Ningbo-Zhoushan', country: 'China', corridor: 'Asia-Pacific', lat: 29.8683, lng: 121.844, activeVessels: 278, anchoredQueue: 44, avgDwellHours: 48.2, congestionIndex: 77, status: 'Severe Congestion', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 35.3 },
  { id: 'CNSZX', name: 'Port of Shenzhen (Yantian)', country: 'China', corridor: 'Asia-Pacific', lat: 22.5736, lng: 114.274, activeVessels: 245, anchoredQueue: 31, avgDwellHours: 41.0, congestionIndex: 69, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 29.9 },
  { id: 'KRPUS', name: 'Port of Busan (New Port)', country: 'South Korea', corridor: 'Asia-Pacific', lat: 35.0758, lng: 128.8147, activeVessels: 210, anchoredQueue: 27, avgDwellHours: 39.1, congestionIndex: 65, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 23.1 },
  { id: 'HKHKG', name: 'Port of Hong Kong (Kwai Tsing)', country: 'Hong Kong', corridor: 'Asia-Pacific', lat: 22.3333, lng: 114.1167, activeVessels: 189, anchoredQueue: 18, avgDwellHours: 29.5, congestionIndex: 52, status: 'Normal Flow', dominantVesselClass: 'Container', annualTeuMillions: 14.4 },
  { id: 'MYPKG', name: 'Port Klang (Westports)', country: 'Malaysia', corridor: 'Asia-Pacific', lat: 2.9999, lng: 101.3928, activeVessels: 176, anchoredQueue: 24, avgDwellHours: 37.8, congestionIndex: 63, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 14.1 },
  { id: 'JPTYO', name: 'Port of Tokyo / Yokohama', country: 'Japan', corridor: 'Asia-Pacific', lat: 35.4437, lng: 139.638, activeVessels: 158, anchoredQueue: 12, avgDwellHours: 24.0, congestionIndex: 42, status: 'Normal Flow', dominantVesselClass: 'Ro-Ro', annualTeuMillions: 8.1 },
  { id: 'INNSA', name: 'Jawaharlal Nehru Port (Nhava Sheva)', country: 'India', corridor: 'Asia-Pacific', lat: 18.9499, lng: 72.9512, activeVessels: 144, anchoredQueue: 18, avgDwellHours: 31.4, congestionIndex: 55, status: 'Normal Flow', dominantVesselClass: 'Container', annualTeuMillions: 6.4 },
  { id: 'INMAA', name: 'Port of Chennai & Ennore', country: 'India', corridor: 'Asia-Pacific', lat: 13.0844, lng: 80.2899, activeVessels: 118, anchoredQueue: 15, avgDwellHours: 33.0, congestionIndex: 57, status: 'Moderate Delay', dominantVesselClass: 'Ro-Ro', annualTeuMillions: 2.8 },
  { id: 'AUMEL', name: 'Port of Melbourne', country: 'Australia', corridor: 'Asia-Pacific', lat: -37.8136, lng: 144.913, activeVessels: 94, anchoredQueue: 9, avgDwellHours: 25.6, congestionIndex: 41, status: 'Normal Flow', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 3.2 },

  // Europe-Med (9 hubs)
  { id: 'NLRTM', name: 'Port of Rotterdam (Maasvlakte)', country: 'Netherlands', corridor: 'Europe-Med', lat: 51.955, lng: 4.132, activeVessels: 184, anchoredQueue: 22, avgDwellHours: 36.4, congestionIndex: 62, status: 'Moderate Delay', dominantVesselClass: 'Tanker', annualTeuMillions: 13.4 },
  { id: 'BEANR', name: 'Port of Antwerp-Bruges', country: 'Belgium', corridor: 'Europe-Med', lat: 51.2689, lng: 4.3422, activeVessels: 151, anchoredQueue: 19, avgDwellHours: 33.7, congestionIndex: 58, status: 'Moderate Delay', dominantVesselClass: 'Ro-Ro', annualTeuMillions: 12.5 },
  { id: 'DEHAM', name: 'Port of Hamburg', country: 'Germany', corridor: 'Europe-Med', lat: 53.5294, lng: 9.9611, activeVessels: 127, anchoredQueue: 12, avgDwellHours: 26.2, congestionIndex: 45, status: 'Normal Flow', dominantVesselClass: 'Ro-Ro', annualTeuMillions: 7.7 },
  { id: 'ESALG', name: 'Port of Algeciras (Gibraltar Strait)', country: 'Spain', corridor: 'Europe-Med', lat: 36.1275, lng: -5.4397, activeVessels: 164, anchoredQueue: 28, avgDwellHours: 42.5, congestionIndex: 71, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 4.8 },
  { id: 'ESBCN', name: 'Port of Valencia & Barcelona', country: 'Spain', corridor: 'Europe-Med', lat: 39.445, lng: -0.319, activeVessels: 132, anchoredQueue: 14, avgDwellHours: 28.4, congestionIndex: 49, status: 'Normal Flow', dominantVesselClass: 'Container', annualTeuMillions: 5.1 },
  { id: 'GRPIR', name: 'Port of Piraeus (Athens)', country: 'Greece', corridor: 'Europe-Med', lat: 37.942, lng: 23.646, activeVessels: 149, anchoredQueue: 26, avgDwellHours: 44.1, congestionIndex: 73, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 5.1 },
  { id: 'ITGOA', name: 'Port of Genoa (Ligurian Hub)', country: 'Italy', corridor: 'Europe-Med', lat: 44.4056, lng: 8.912, activeVessels: 108, anchoredQueue: 11, avgDwellHours: 27.0, congestionIndex: 46, status: 'Normal Flow', dominantVesselClass: 'Tanker', annualTeuMillions: 2.7 },
  { id: 'GBFXT', name: 'Port of Felixstowe', country: 'United Kingdom', corridor: 'Europe-Med', lat: 51.9542, lng: 1.3095, activeVessels: 115, anchoredQueue: 16, avgDwellHours: 34.8, congestionIndex: 59, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 3.7 },
  { id: 'EGPSD', name: 'Port Said (Suez Canal North)', country: 'Egypt', corridor: 'Europe-Med', lat: 31.2565, lng: 32.311, activeVessels: 204, anchoredQueue: 47, avgDwellHours: 56.0, congestionIndex: 84, status: 'Severe Congestion', dominantVesselClass: 'Tanker', annualTeuMillions: 4.2 },

  // North & South America (7 hubs)
  { id: 'USLAX', name: 'Port of Los Angeles / Long Beach', country: 'United States', corridor: 'North America', lat: 33.7361, lng: -118.2622, activeVessels: 162, anchoredQueue: 34, avgDwellHours: 58.2, congestionIndex: 79, status: 'Severe Congestion', dominantVesselClass: 'Container', annualTeuMillions: 17.6 },
  { id: 'USNYC', name: 'Port of New York & New Jersey', country: 'United States', corridor: 'North America', lat: 40.6681, lng: -74.0451, activeVessels: 148, anchoredQueue: 21, avgDwellHours: 38.5, congestionIndex: 64, status: 'Moderate Delay', dominantVesselClass: 'Container', annualTeuMillions: 7.8 },
  { id: 'USSAV', name: 'Port of Savannah (Garden City)', country: 'United States', corridor: 'North America', lat: 32.1285, lng: -81.1517, activeVessels: 96, anchoredQueue: 11, avgDwellHours: 27.5, congestionIndex: 48, status: 'Normal Flow', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 5.4 },
  { id: 'USHOU', name: 'Port of Houston (Gulf Energy Hub)', country: 'United States', corridor: 'North America', lat: 29.726, lng: -95.265, activeVessels: 174, anchoredQueue: 23, avgDwellHours: 35.9, congestionIndex: 61, status: 'Moderate Delay', dominantVesselClass: 'Tanker', annualTeuMillions: 3.8 },
  { id: 'CAVAN', name: 'Port of Vancouver', country: 'Canada', corridor: 'North America', lat: 49.289, lng: -123.111, activeVessels: 112, anchoredQueue: 15, avgDwellHours: 32.1, congestionIndex: 53, status: 'Normal Flow', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 3.6 },
  { id: 'PABLB', name: 'Port of Balboa (Panama Canal)', country: 'Panama', corridor: 'North America', lat: 8.952, lng: -79.566, activeVessels: 192, anchoredQueue: 42, avgDwellHours: 54.6, congestionIndex: 82, status: 'Severe Congestion', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 8.3 },
  { id: 'BRSSZ', name: 'Port of Santos', country: 'Brazil', corridor: 'North America', lat: -23.9618, lng: -46.3225, activeVessels: 119, anchoredQueue: 29, avgDwellHours: 49.3, congestionIndex: 74, status: 'Moderate Delay', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 4.8 },

  // Middle East & Africa (5 hubs)
  { id: 'AEJEA', name: 'Port of Jebel Ali (Dubai)', country: 'UAE', corridor: 'Middle East', lat: 24.9857, lng: 55.0273, activeVessels: 138, anchoredQueue: 14, avgDwellHours: 24.8, congestionIndex: 44, status: 'Normal Flow', dominantVesselClass: 'Container', annualTeuMillions: 14.5 },
  { id: 'SAJED', name: 'Jeddah Islamic Port (Red Sea)', country: 'Saudi Arabia', corridor: 'Middle East', lat: 21.4858, lng: 39.1667, activeVessels: 112, anchoredQueue: 25, avgDwellHours: 46.0, congestionIndex: 72, status: 'Moderate Delay', dominantVesselClass: 'Tanker', annualTeuMillions: 5.6 },
  { id: 'OMSLL', name: 'Port of Salalah (Arabian Sea)', country: 'Oman', corridor: 'Middle East', lat: 16.9356, lng: 54.0044, activeVessels: 104, anchoredQueue: 13, avgDwellHours: 26.5, congestionIndex: 47, status: 'Normal Flow', dominantVesselClass: 'Container', annualTeuMillions: 4.5 },
  { id: 'QAHMD', name: 'Hamad Port (Doha LNG & Cargo)', country: 'Qatar', corridor: 'Middle East', lat: 25.031, lng: 51.618, activeVessels: 98, anchoredQueue: 9, avgDwellHours: 22.4, congestionIndex: 39, status: 'Normal Flow', dominantVesselClass: 'Tanker', annualTeuMillions: 1.6 },
  { id: 'ZADUR', name: 'Port of Durban (Cape Route)', country: 'South Africa', corridor: 'Middle East', lat: -29.8723, lng: 31.0248, activeVessels: 134, anchoredQueue: 33, avgDwellHours: 51.8, congestionIndex: 78, status: 'Severe Congestion', dominantVesselClass: 'Bulk Carrier', annualTeuMillions: 2.6 },
];

export const VESSEL_MIX_SHARE = [
  { label: 'Container Ships (ULCV / Feeder)', share: 48, color: 'bg-sky-400' },
  { label: 'Dry Bulk Carriers (Capesize / Panamax)', share: 24, color: 'bg-amber-400' },
  { label: 'Crude & LNG Tankers', share: 18, color: 'bg-emerald-400' },
  { label: 'Ro-Ro & Vehicle Carriers', share: 10, color: 'bg-purple-400' },
];

export const MARITIME_EVENTS = [
  {
    id: 'EVT-901',
    time: '14 mins ago',
    port: 'Port of Shanghai (Yangshan)',
    type: 'Anchorage Queue Surge',
    detail: '68 vessels waiting outside outer fairway due to dense fog advisory.',
    severity: 'high',
  },
  {
    id: 'EVT-902',
    time: '29 mins ago',
    port: 'Port Said (Suez Canal North)',
    type: 'Convoy Transit Backlog',
    detail: '47 tankers and container ships staged in northern anchorage awaiting southbound slot.',
    severity: 'high',
  },
  {
    id: 'EVT-903',
    time: '42 mins ago',
    port: 'Port of Singapore (Tuas)',
    type: 'Bunkering & Berth Reallocation',
    detail: 'Automated cranes diverted to Berths 14–19 to clear Asia-Europe feeder backlog.',
    severity: 'high',
  },
  {
    id: 'EVT-904',
    time: '2 hrs ago',
    port: 'Port of Rotterdam',
    type: 'Customs Fast-Track Active',
    detail: 'Digital manifest clearance reduced LNG tanker dwell time by 4.2 hours.',
    severity: 'normal',
  },
];