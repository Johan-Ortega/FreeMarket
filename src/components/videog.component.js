import React, { Component } from "react";
import VideogDataService from "../services/videog.service";

export default class Videog extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateVideog = this.updateVideog.bind(this);
    this.deleteVideog = this.deleteVideog.bind(this);

    this.state = {
      currentVideog: {
        id: null,
        title: "",
        description: "",
        published: false,
        fileurl: ""
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { Videog } = nextProps;
    if (prevState.currentVideog.id !== Videog.id) {
      return {
        currentVideog: Videog,
        message: ""
      };
    }

    return prevState.currentVideog;
  }

  componentDidMount() {
    this.setState({
      currentVideog: this.props.Videog,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentVideog: {
          ...prevState.currentVideog,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentVideog: {
        ...prevState.currentVideog,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    VideogDataService.update(this.state.currentVideog.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentVideog: {
            ...prevState.currentVideog,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateVideog() {
    const data = {
      title: this.state.currentVideog.title,
      description: this.state.currentVideog.description,
    };

    VideogDataService.update(this.state.currentVideog.id, data)
      .then(() => {
        this.setState({
          message: "The Videog was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteVideog() {
    VideogDataService.delete(this.state.currentVideog.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentVideog } = this.state;

    return (
      <div>
        <h4>Videog</h4>
        {currentVideog ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentVideog.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentVideog.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>Foto:</label>
                {currentVideog.fileurl}
                <img src={currentVideog.fileurl} alt="" />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentVideog.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentVideog.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteVideog}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateVideog}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Videog...</p>
          </div>
        )}
      </div>
    );
  }
}