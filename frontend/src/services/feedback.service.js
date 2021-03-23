import http from "../http-common";

class FeedbackDataService {
  getAll() {
    return http.get("/feedback");
  }

  get(id) {
    return http.get(`/feedback/${id}`);
  }

  getFeedback(id) {
    return http.get(`/feedback/employee/${id}`);
  }

  create(data) {
    return http.post("/feedback", data);
  }

  update(id, data) {
    return http.put(`/feedback/${id}`, data);
  }

  delete(id) {
    return http.delete(`/feedback/${id}`);
  }

  findByName(name) {
    return http.get(`/feedback?name=${name}`);
  }
}

export default new FeedbackDataService();