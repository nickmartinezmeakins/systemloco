interface Model {
  name: string;
  family: string;
  product: string;
}

interface Device {
  id: string;
  name: string | null;
  model: Model;
  lastReportTime: string | null;
  nextReportTime: string | null;
}

export interface ApiResponse {
  results: Device[];
}