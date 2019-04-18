import React, { Component } from 'react';
import FormAppbar from '../components/FormAppbar';

class EmployerForm extends Component {
  handleCancel = () => null;
  handleSubmit = () => null;
  render() {
    return (
      <>
        <FormAppbar
          pageTitle="Πληροφορίες Εργοδότη"
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </>
    );
  }
}
export default EmployerForm;
