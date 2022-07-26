import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from "./redux/store/store";
import AppRouter from "./router/AppRouter";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={store} >
    <AppRouter />
  </Provider>
);
