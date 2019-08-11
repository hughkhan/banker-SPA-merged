import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import { Provider } from "react-redux";
import store from "lib/store";
import Form from "containers/Form";
import Bootstrap from "containers/Bootstrap";
import Login from "containers/Login";

//const store = createStore(Reducer);

function RequireAuth(props) {
  if (!store.getState().userInfo.loggedIn) {
    return <Redirect to="/login" />;
  } else {
    return <div>{props.children}</div>;
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/application"
              render={() => (
                <RequireAuth>
                  <Form />
                </RequireAuth>
              )}
            />
            <Route path="/admin" component={Bootstrap} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
