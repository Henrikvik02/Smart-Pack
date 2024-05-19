import { apiClient } from "./api-client";

interface Entity {
  id: string | number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Fetch all entities from a given endpoint
  async getAll<T>(): Promise<T[]> {
    const controller = new AbortController();
    try {
      const response = await apiClient.get<T[]>(`${this.endpoint}`, { signal: controller.signal });
      return response.data;  // Assuming the server responds with the array directly
    } catch (error) {
      // Handle errors (e.g., network error, server error)
      throw this.handleError(error);
    } finally {
      controller.abort();
    }
  }

  // Delete an entity based on ID
  async delete(id: string | number): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create a new entity
  async create<T>(entity: T): Promise<T> {
    try {
      const response = await apiClient.post<T>(this.endpoint, entity);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update an existing entity
  async update<T extends Entity>(entity: T): Promise<T> {
    try {
      const response = await apiClient.put<T>(`${this.endpoint}/${entity.id}`, entity);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling method
  private handleError(error: any): Error {
    // Log the error or send it to a monitoring service
    console.error("API error:", error.response?.data || error.message);

    // Optionally, customize the error message or type based on the error status or response
    if (error.response) {
      // Server responded with a status code outside the range of 2xx
      throw new Error(error.response.data.message || "An unexpected server error occurred");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error in setting up the request");
    }
  }
}

const createHttpService = (endpoint: string) => new HttpService(endpoint);

export default createHttpService;
