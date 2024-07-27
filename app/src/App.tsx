import "antd/dist/antd.css";
import "./App.css";
import Routes from "./router/index";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { initAxios } from "./utilities/utilities";

const App = () => {
  initAxios(null);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
