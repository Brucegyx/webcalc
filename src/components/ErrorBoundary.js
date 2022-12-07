import React from 'react';

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch (err, info) {
    console.log(err + info);
  }

  render () {
    if (this.state.hasError) {
      return <h1>Error in expression</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
