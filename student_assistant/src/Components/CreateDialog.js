import React, { Component } from 'react';

import { Modal, Button, Form, FormGroup,
         Col, ControlLabel, FormControl } from 'react-bootstrap';

import './Styles/CreateDialog.css';

class CreateDialog extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit      = this.handleSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleSubmit(e) {
    this.props.onCreate(this.courseName.value,
                        this.professor.value,
                        parseInt(this.year.value, 10));
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  render() {
    let dialog = () => {
      if(this.props.visibility) {
        return(
          <div className="static-modal dialog-container">
            <Modal.Dialog className="dialog">
              <Modal.Header>
                <Modal.Title >Create new course</Modal.Title>
              </Modal.Header>

              <Modal.Body >
                <Form horizontal id="newCourseForm"
                      onSubmit={this.handleSubmit}>
              		<FormGroup controlId="formHorizontalText"
                             className="formElementContainer" >
              			<Col componentClass={ControlLabel} sm={2}
                         className="formElementTitle" >
              				<p>Course</p>
              			</Col>

              			<Col sm={10} className="inputForm">
              				<FormControl type="text" placeholder="Course Name"
                                   inputRef={ref => { this.courseName = ref; }} />
              			</Col>
              		</FormGroup>

                  <FormGroup controlId="formHorizontalText"
                             className="formElementContainer" >
              			<Col componentClass={ControlLabel} sm={2}
                         className="formElementTitle" >
              				<p>Professor</p>
              			</Col>

              			<Col sm={10} className="inputForm">
              				<FormControl type="text" placeholder="Professor"
                                   inputRef={ref => { this.professor = ref; }} />
              			</Col>
              		</FormGroup>

                  <FormGroup controlId="formControlsSelect"
                             className="formElementContainer" >
                     <Col componentClass={ControlLabel} sm={2}
                          className="formElementTitle" >
               				<p>Year</p>
               			</Col>

                    <Col sm={10} >
                      <FormControl componentClass="select" placeholder="year"
                                   inputRef={ref => { this.year = ref; }}
                                   className="formSelectInput" >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </FormControl>
                    </Col>

                  </FormGroup>
              	</Form>
              </Modal.Body>

              <Modal.Footer>
                <Button className="createButton" bsStyle="success"
                        onClick={this.handleSubmit} >
                  Create
                </Button>
                <Button className="createButton" bsStyle="primary"
                        onClick={this.handleCancelClick} >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        );
      }
    }

    return (
      <div className="">
        {dialog()}
      </div>
    );
  }
}

export default CreateDialog;
