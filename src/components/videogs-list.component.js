import React, { Component } from "react";
import VideogDataService from "../services/videog.service";

import Videog from "./videog.component";

export default class VideogsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVideog = this.setActiveVideog.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      Videogs: [],
      currentVideog: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = VideogDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let Videogs = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      Videogs.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
        fileurl: data.fileurl
      });
    });

    this.setState({
      Videogs: Videogs,
    });
  }

  refreshList() {
    this.setState({
      currentVideog: null,
      currentIndex: -1,
    });
  }

  setActiveVideog(Videog, index) {
    this.setState({
      currentVideog: Videog,
      currentIndex: index,
    });
  }

  render() {
    const { Videogs, currentVideog, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Videogs List</h4>

          <ul className="list-group">
            {Videogs &&
              Videogs.map((Videog, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveVideog(Videog, index)}
                  key={index}
                >
                  {Videog.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentVideog ? (
            <Videog
              Videog={currentVideog}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Videog...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}