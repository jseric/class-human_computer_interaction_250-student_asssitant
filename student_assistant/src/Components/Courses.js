import React, { Component } from 'react';

import { Button, Alert } from 'react-bootstrap';

import CourseItem from './CourseItem.js';
import DeleteDialog from './DeleteDialog.js';
import CreateDialog from './CreateDialog.js';

import { UserCourses } from './../Data.js';

import './Styles/Courses.css';

class Courses extends Component {
  constructor() {
    super();

    this.handleCourseDelete       = this.handleCourseDelete.bind(this);
    this.handleCourseDeleteClick  = this.handleCourseDeleteClick.bind(this);
    this.handleCourseDeleteCancel = this.handleCourseDeleteCancel.bind(this);

    this.handleCreateNewCourseClick = this.handleCreateNewCourseClick.bind(this);
    this.handleCreateNewCourse      = this.handleCreateNewCourse.bind(this);
    this.handleCreateCourseCancel   = this.handleCreateCourseCancel.bind(this);

    this.handleDismissDeleteAlert  = this.handleDismissDeleteAlert.bind(this);
    this.handleDismissConfirmAlert = this.handleDismissConfirmAlert.bind(this);

    this.state = {
      userCourses: UserCourses,
      deleteCourseId: null,
      deleteCourseName: "",
      isDeleteDialogVisible: false,
      isCreateDialogVisible: false,
      showDeleteAlert: false,
      showCreateAlert: false
    };
  }

  handleCourseDeleteClick(id) {
    let currState = this.state;

    let courses = currState.userCourses[this.props.userId].courses;
    let index = courses.findIndex(obj => obj.id === id);

    currState.deleteCourseId = id;
    currState.deleteCourseName = currState.userCourses[this.props.userId].courses[index].courseName;
    currState.isDeleteDialogVisible = true;

    this.setState(currState);
  }

  handleCourseDelete(id) {
    let currState = this.state;

    let userCourses = currState.userCourses;
    let courses = userCourses[this.props.userId].courses;

    let index = courses.findIndex(obj => obj.id === id);

    courses.splice(index, 1);
    userCourses[this.props.userId].courses = courses;

    this.setState({
      userCourses: userCourses,
      deleteCourseId: null,
      deleteCourseName: "",
      isDeleteDialogVisible: false,
      isCreateDialogVisible: false,
      showDeleteAlert: true,
      showCreateAlert: false
    }, () => {});
  }

  handleCourseDeleteCancel() {
    let currState = this.state;

    this.setState({
      userCourses: currState.userCourses,
      deleteCourseId: null,
      deleteCourseName: "",
      isDeleteDialogVisible: false,
      isCreateDialogVisible: false,
      showDeleteAlert: false,
      showCreateAlert: false
    });
  }

  handleCreateNewCourseClick() {
    let currState = this.state;
    currState.isCreateDialogVisible = true;
    this.setState(currState);
  }

  handleCreateNewCourse(courseName, professor, year) {
    let currState = this.state;
    let userCourses = currState.userCourses[this.props.userId];
    let courses = userCourses.courses;

    let checkId = function(courses, id) {
      return courses.find(obj => obj.id === id);
    }

    //Get unique id for new course
    let isIdUnique = false;
    let id;
    do {
      id = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));

      if(checkId(courses, id) === undefined) {
        isIdUnique = true;
      }
    } while(!isIdUnique);

    courses.push({
      id: id,
      courseName: courseName,
      prof: professor,
      year: year
    });

    userCourses.courses = courses;
    currState.userCourses[this.props.userId] = userCourses;
    currState.isCreateDialogVisible = false;
    currState.showCreateAlert = true;

    this.setState(currState);
  }

  handleCreateCourseCancel() {
    let currState = this.state;

    this.setState({
      userCourses: currState.userCourses,
      deleteCourseId: null,
      deleteCourseName: "",
      isDeleteDialogVisible: false,
      isCreateDialogVisible: false,
      showDeleteAlert: false,
      showCreateAlert: false
    });
  }

  handleDismissDeleteAlert() {
    let currState = this.state;
    currState.showDeleteAlert = false;
    this.setState(currState);
  }

  handleDismissConfirmAlert() {
    let currState = this.state;
    currState.showCreateAlert = false;
    this.setState(currState);
  }

  render() {
    let userId = this.props.userId;
    let courseData = this.state.userCourses[userId].courses;

    let courses = courseData.map(
      course => {
        return (
          <div key={course.id} className="courseDiv">
            <CourseItem course={course} onDeleteClick={this.handleCourseDeleteClick} />
          </div>
        );
      }
    );

    let deleteAlert = () => {
      if(this.state.showDeleteAlert) {
        return (
          <Alert className="alert" bsStyle="info" onDismiss={this.handleDismissDeleteAlert}>
            <h4>The course has been deleted</h4>
            <p>
              <Button bsStyle="primary" onClick={this.handleDismissDeleteAlert}
                      className="alertBtn" >Hide Alert</Button>
            </p>
          </Alert>
       );
      }
    };

    let createAlert = () => {
      if(this.state.showCreateAlert) {
        return (
          <Alert className="alert" bsStyle="info" onDismiss={this.handleDismissConfirmAlert}>
            <h4>The course has been created</h4>
            <p>
              <Button bsStyle="primary" onClick={this.handleDismissConfirmAlert}
                      className="alertBtn" >Hide Alert</Button>
            </p>
          </Alert>
       );
      }
    };

    return (
      <div className="coursesContainer">
        <DeleteDialog visibility={this.state.isDeleteDialogVisible}
                      courseName={this.state.deleteCourseName}
                      courseId={this.state.deleteCourseId}
                      onConfirm={this.handleCourseDelete}
                      onCancel={this.handleCourseDeleteCancel} />

        <CreateDialog visibility={this.state.isCreateDialogVisible}
                      onCreate={this.handleCreateNewCourse}
                      onCancel={this.handleCreateCourseCancel} />

        {deleteAlert()}

        {createAlert()}

        <div className="coursesButtonContainer" >
          <div id="addButton" onClick={this.handleCreateNewCourseClick} >
            <i className="fas fa-plus-circle fa-5x" />
          </div>

          <div className="sortContainer">
            <div className="innerSortContainer">
              <div className="buttonContainer">
                <i id="sort-num-down" className="fas fa-sort-numeric-down fa-2x" />
              </div>

              <div className="buttonContainer">
                <i id="sort-num-up" className="fas fa-sort-numeric-up fa-2x" />
              </div>
            </div>

            <div className="innerSortContainer">
              <div className="buttonContainer">
                <i id="sort-alpha-down" className="fas fa-sort-alpha-down fa-2x" />
              </div>

              <div className="buttonContainer">
                <i id="sort-alpha-up" className="fas fa-sort-alpha-up fa-2x" />
              </div>
            </div>

          </div>

        </div>

        <div className="courses">
          {courses}
        </div>
      </div>
    );
  }
}

export default Courses;
