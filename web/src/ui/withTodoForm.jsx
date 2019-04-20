import React from 'react';


export default function withTodoForm(WrappedComponent) {
  return class WrappedTodoForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        title: '',
        descr: '',
      };

      this.onTitleChange = this.onTitleChange.bind(this);
      this.onDescriptionChange = this.onDescriptionChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleChange(e) {
      const { target: { value } } = e;
      this.setState({ title: value });
    };

    onDescriptionChange(e) {
      const { target: { value } } = e;
      this.setState({ descr: value });
    };

    onSubmit(e) {
      const { onSubmit } = this.props;
      const { title, descr } = this.state;

      e.preventDefault();

      onSubmit({ title, descr });
    };

    render() {
      const { title, descr } = this.state;

      return (
        <WrappedComponent
          title={title}
          descr={descr}
          onTitleChange={this.onTitleChange}
          onDescriptionChange={this.onDescriptionChange}
          onSubmit={this.onSubmit}
        />
      );
    };
  }
}
