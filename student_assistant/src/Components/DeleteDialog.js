import React, { Component } from 'react';

import { Modal, Button } from 'react-bootstrap';

import './Styles/DeleteDialog.css';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);

    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick  = this.handleCancelClick.bind(this);
  }

  handleConfirmClick() {
    this.props.onConfirm(this.props.courseId);
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  render() {
    let dialog = () => {
      if(this.props.visibility) {
        return (
          <div className="static-modal dialog-container">
            <Modal.Dialog className="dialog">
              <Modal.Header>
                <Modal.Title >Are you sure you want to delete {this.props.courseName} ?</Modal.Title>
              </Modal.Header>

              <Modal.Body ><b>Warning</b>: This will delete all information regarding this course!</Modal.Body>

              <Modal.Footer>
                <Button className="deleteButton" bsStyle="danger" onClick={this.handleConfirmClick}>Delete Course</Button>
                <Button className="deleteButton" bsStyle="primary" onClick={this.handleCancelClick}>Cancel</Button>
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

export default DeleteDialog;
