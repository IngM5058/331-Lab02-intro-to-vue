import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/IngM5058/mockServer',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(): Promise<AxiosResponse<EventItem[]>> {
    // return apiClient.get('/events')
    return apiClient.get<EventItem[]>(`/events`)
  }
  getEventByID(id: number): Promise<AxiosResponse<EventItem>> {
    return apiClient.get<EventItem>(`/events/`+ id.toString())
  }
}
