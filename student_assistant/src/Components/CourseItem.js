import React, { Component } from 'react';

import './Styles/CourseItem.css';

class CourseItem extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);

    this.state = {
      color: ''
    };
  }

  handleDeleteClick() {
    this.props.onDeleteClick(this.props.course.id);
  }

  getColor() {
    let color;

    switch(this.props.course.year) {
      case 1:
        color = "greenColor";
        break;
      case 2:
        color = "redColor";
        break;
      case 3:
        color = "blueColor";
        break;
      case 4:
        color = "yellowColor";
        break;
      case 5:
        color = "turqoiseColor";
        break;
      default:
        color= "whiteColor";
    }

    this.setState({
      color: color
    });
  }

  componentWillMount() {
    this.getColor();
  }

  componentDidMount() {
    this.getColor();
  }

  render() {
    let classValue = "courseItem " + this.state.color;
    let subColorClass = "iconContainer sub" + this.state.color;

    return (
      <div className={classValue} >
        <div className="courseNameContainer">
          <h1 className="courseName" >{this.props.course.courseName}</h1>
        </div>

        <div className={subColorClass}>
          <div className="icon" onClick={this.handleDeleteClick} >
            <i className="fas fa-trash fa-2x icon" />
          </div>

          <div className="icon" >
            <i className="fas fa-share-alt fa-2x icon" />
          </div>

        </div>
      </div>
    );
  }
}

export default CourseItem;
