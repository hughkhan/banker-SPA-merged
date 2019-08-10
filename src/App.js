import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "layouts/MainLayout";

//import { createStore } from "redux";
import { Provider } from "react-redux";
//import Reducer from "reducers/Index";
import store from "lib/store";
import Form from "containers/Form";
import Bootstrap from "containers/Bootstrap";

//const store = createStore(Reducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route path="/application" component={Form} />
            <Route path="/admin" component={Bootstrap} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
