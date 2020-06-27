import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { StdContainer, StdRow, StdCol } from './styles/main';
import { isAuthenticated } from './services/auth';
import { clearMessage } from './services/msg';

import Menu from './pages/main/menu';

import Login from './pages/login';
import ChangePassword from './pages/login/changePsw';
import Logout from './pages/logout';
import Initial from './pages/initial';
import ListaCompany from './pages/crud/company/list.js';
import CreateCompany from './pages/crud/company/create.js';
import EditCompany from './pages/crud/company/edit.js';
import DeleteCompany from './pages/crud/company/delete.js';
import ListaUser from './pages/crud/user/list.js';
import CreateUser from './pages/crud/user/create.js';
import EditUser from './pages/crud/user/edit.js';
import DeleteUser from './pages/crud/user/delete.js';
import ListaQueueType from './pages/crud/queuetype/list.js';
import CreateQueueType from './pages/crud/queuetype/create.js';
import EditQueueType from './pages/crud/queuetype/edit.js';
import DeleteQueueType from './pages/crud/queuetype/delete.js';
import ListaQueue from './pages/crud/queue/list.js';
import CreateQueue from './pages/crud/queue/create.js';
import EditQueue from './pages/crud/queue/edit.js';
import DeleteQueue from './pages/crud/queue/delete.js';
import QueueMgmt from './pages/Operation/QueueMgmt/index.js';
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

function Routes() {
  clearMessage();
  return (
    <BrowserRouter>
      <StdContainer fluid={true}>
        <StdRow sm={12}>
          <StdCol sm={1}>
            <Menu />
          </StdCol>
          <StdCol sm={11}>
            <Switch>
              <Route exact path="/" component={Initial} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/changePassword" component={ChangePassword} />
              <PrivateRoute path="/app" component={Initial} />
              <PrivateRoute path="/companies" component={ListaCompany} />
              <PrivateRoute path="/createcompany" component={CreateCompany} />
              <PrivateRoute path="/editcompany/:id" component={EditCompany} />
              <PrivateRoute
                path="/deletecompany/:id"
                component={DeleteCompany}
              />
              <PrivateRoute path="/users" component={ListaUser} />
              <PrivateRoute path="/createuser" component={CreateUser} />
              <PrivateRoute path="/edituser/:id" component={EditUser} />
              <PrivateRoute path="/deleteuser/:id" component={DeleteUser} />
              <PrivateRoute path="/queuetypes" component={ListaQueueType} />
              <PrivateRoute
                path="/createqueuetype"
                component={CreateQueueType}
              />
              <PrivateRoute
                path="/deletequeuetype"
                component={DeleteQueueType}
              />
              <PrivateRoute path="/editqueuetype" component={EditQueueType} />
              <PrivateRoute path="/queues" component={ListaQueue} />
              <PrivateRoute path="/createqueue" component={CreateQueue} />
              <PrivateRoute path="/editqueue/:id" component={EditQueue} />
              <PrivateRoute path="/deletequeue/:id" component={DeleteQueue} />
              <PrivateRoute path="/opqueues" component={QueueMgmt} />
              <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
          </StdCol>
        </StdRow>
      </StdContainer>
    </BrowserRouter>
  );
}

export default Routes;
