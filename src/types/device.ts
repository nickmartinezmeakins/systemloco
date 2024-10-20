interface Owner {
  id: string;
  name: string;
}

interface Model {
  name: string;
  family: string;
  product: string;
}

interface GlobalLocation {
  lat: number;
  lon: number;
  cep: number;
}

interface LastKnownLocation {
  summary: string;
  global: GlobalLocation;
  zones: string[]; 
}

interface Firmware {
  current: string;
  pending: string | null;
}

interface StatusIndicators {
  battery: string;
  moving: boolean;
  gpsFailure: boolean;
  lowSignal: boolean;
  charging: boolean;
  externalPower: boolean;
  flightMode: boolean;
  pendingSettings: boolean;
}

export interface DeviceItem {
  id: string;
  name: string;
  labels: string[];
  owner: Owner;
  model: Model;
  lastKnownLocation: LastKnownLocation;
  firmware: Firmware;
  statusIndicators: StatusIndicators;
  lastReportTime: string;
  nextReportTime: string; 
}