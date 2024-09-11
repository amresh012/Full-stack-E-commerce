import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <>
        <Link to="/">
      <div className="w-full items-center flex justify-center">
        <img src="https://img.freepik.com/premium-vector/404-error-page-found-design-with-ufo_1124-467.jpg?w=740" alt="" />
      </div>
        </Link>
      </>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
