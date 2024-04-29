import apiClient from "./api-client";

interface Entity {
  id: string | number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Henter alle enheter fra en gitt endpoint
  getAll<T>(): { request: Promise<T[]>, cancel: () => void } {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(`${this.endpoint}`, { signal: controller.signal });
    return { request: request.then(res => res.data), cancel: () => controller.abort() };
  }

  // Sletter en enhet basert på ID
  delete(id: string | number) {
    return apiClient.delete(`${this.endpoint}/${id}`);
  }

  // Oppretter en ny enhet
  create<T>(entity: T) {
    return apiClient.post<T, { data: T }>(this.endpoint, entity).then(res => res.data);
  }

  // Oppdaterer en eksisterende enhet
  update<T extends Entity>(entity: T) {
    return apiClient.patch<T, { data: T }>(`${this.endpoint}/${entity.id}`, entity).then(res => res.data);
  }
}

const createHttpService = (endpoint: string) => new HttpService(endpoint);

export default createHttpService;
