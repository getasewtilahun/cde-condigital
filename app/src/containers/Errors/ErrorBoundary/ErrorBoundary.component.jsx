import React from "react";
import {Button,Card} from "antd";
import ErrorIcon from "../../../Images/error.png"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <>
        <div className="login-wrapper">
          <Card className="error-card">
              <img src={ErrorIcon} alt="error"/>
            <h3 className="mt-4">Something went wrong</h3>
            <h6>Please check your connection</h6>
            <Button type="primary" onClick={()=>window.location.reload()}>Refresh</Button>
          </Card>
        </div>
      
      
      
      </>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
