import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import Comment from "../comments/Comment";
import axios from "axios";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      showMovieInfo: false
    };
    this.onShowClick = this.onShowClick.bind(this);
  }

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(
        `https://my-json-server.typicode.com/hufflepuffprogrammer/test2/movies/${id}`
      );
      dispatch({ type: "DELETE_MOVIE", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_MOVIE", payload: id });
    }
  };

  onShowClick = () => {
    this.setState({
      showMovieInfo: !this.state.showMovieInfo
    });
  };

  render() {
    const { id, title, desc, writer, director } = this.props.movie;
    const { showMovieInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          const { comments } = value;

          const newComments = comments.filter(
            comment => comment.movieid === id
          );

          return (
            <div>
              <tr>
                <td>
                  <img
                    src="https://static.metacritic.com/images/products/movies/3/e539bd40e3b68ba9e95ad337b30136b2-250h.jpg"
                    alt="Skywalker Risen"
                    class="img-thumbnail"
                  />
                </td>
                <td>
                  <div class="row">
                    <h4>{title}</h4>
                  </div>
                  <div class="row">
                    <text class="mr-1 font-weight-bold">Dir: </text> {director}
                  </div>
                  <div class="row">
                    <text class="mr-1 font-weight-bold">Writer: </text> {writer}
                  </div>
                  <div class="row">
                    <text class="mr-1 font-weight-bold">Summary: </text> {desc}
                  </div>
                </td>
              </tr>

              <h4>
                {title}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                />
                <Link to={`movie/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {showMovieInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">{desc}</li>
                  <li className="list-group-item">writer: {writer}</li>
                  <li className="list-group-item">director: {director}</li>
                  <li className="list-group-item">
                    <span className="pull-right">
                      <Link to={`comments/${id}`}> >>>View More Comments</Link>
                    </span>
                  </li>
                  {newComments.slice(0, 3).map(comment => (
                    <Comment key={id} comment={comment} />
                  ))}
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
Movie.propTypes = {
  movie: PropTypes.object.isRequired
};
export default Movie;
