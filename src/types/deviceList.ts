interface Model {
  name: string;
  family: string;
  product: string;
}

interface Device {
  id: string;
  name: string | null;
  model: Model;
  lastReportTime: string;
  nextReportTime: string;
}

export interface ApiResponse {
  results: Device[];
}