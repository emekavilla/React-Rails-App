import React, { PropTypes } from 'react';
import axios from 'axios';




export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {
       value: '',
       comments: [],
    };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

  }


componentDidMount() {
    this.getRequest();
  }

  getRequest() {

    const url = 'https://soccer-arts-blog.firebaseio.com/posts/.json';
    axios.get(url)
      .then((response) => {
        console.log(response);

        const data = response.data;
        let comments = [];

          if (data) {
            comments = Object.keys(data).map((id) => {
              const comment = data[id];
              return {
                id: id,
                post: comment.post
              };
            });
          }


          comments.reverse();

        this.setState({ comments })
      })

      .catch((error) => {
        console.log(error);
      })
  }

 postRequest() {
    const url = 'https://soccer-arts-blog.firebaseio.com/posts.json';

    axios.post(url, {
          post: this.state.value
          })
          .then(() => {
            this.getRequest();
            this.setState({ value: '' })
          })
          .catch((error) => {
            console.log(error);
          })
  }

   handleChange(e) {
    this.setState({ value: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    this.postRequest();
  }

  render() {
    return (
      <Input
          inputValue={this.state.input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="Tweets">
        <Comments
          id="test"
          comments={this.state.comments}
          deleteRequest={this.deleteRequest}
          patchRequest={this.patchRequest}
        />
          </div>
    );
  }
}
