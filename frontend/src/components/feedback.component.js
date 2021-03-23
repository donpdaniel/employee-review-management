import React, { Component } from "react";
import FeedbackDataService from "../services/feedback.service";

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.getFeedback = this.getFeedback.bind(this);
    this.updateReviewed = this.updateReviewed.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.deleteFeedback = this.deleteFeedback.bind(this);

    this.state = {
      currentFeedback: {
        id: null,
        name: "",
        remarks: "",
        reviewed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFeedback(this.props.match.params.id);
  }

  onChangeRemarks(e) {
    const remarks = e.target.value;

    this.setState(prevState => ({
      currentFeedback: {
        ...prevState.currentFeedback,
        remarks: remarks
      }
    }));
  }

  getFeedback(id) {
    FeedbackDataService.get(id)
      .then(response => {
        this.setState({
          currentFeedback: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateReviewed(status) {
    var data = {
      id: this.state.currentFeedback.id,
      name: this.state.currentFeedback.name,
      remarks: this.state.currentFeedback.remarks,
      reviewed: status
    };

    FeedbackDataService.update(this.state.currentFeedback.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFeedback: {
            ...prevState.currentFeedback,
            reviewed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFeedback() {
    FeedbackDataService.update(
      this.state.currentFeedback.id,      
      { ...this.state.currentFeedback, reviewed: true },
    )
      .then(response => {
        console.log(response.data);
        this.setState(prevState => ({
          message: "The feedback was updated successfully!",
          currentFeedback: {
            ...prevState.currentFeedback,
            reviewed: true
          }
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFeedback() {
    FeedbackDataService.delete(this.state.currentFeedback.id)
      .then(response => {
        this.props.history.push('/feedbacks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFeedback } = this.state;

    return (
      <div>
        {currentFeedback ? (
          <div className="edit-form">
            <h4>Performance Review</h4>
            <form>
              <div className="form-group">
                <strong><label htmlFor="name">Employee</label></strong>:
                {currentFeedback.employee && currentFeedback.employee.name}
              </div>
              <div className="form-group">
                <strong><label htmlFor="remarks">Remarks</label></strong>:
                <textarea
                  type="text"
                  className="form-control"
                  id="remarks"
                  value={currentFeedback.remarks}
                  onChange={this.onChangeRemarks}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFeedback.reviewed ? "Reviewed" : "Pending"}
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFeedback}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Feedback...</p>
          </div>
        )}
      </div>
    );
  }
}