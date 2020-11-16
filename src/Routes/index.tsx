import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import EditOrphanage from '../pages/EditOrphanage';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPasswrod from '../pages/ResetPassword';
import DeletePage from '../pages/DeletePage';
import Dashboard from '../pages/Dashboard';
import OrphanageCreated from '../pages/CreatedOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanageCreated" component={OrphanageCreated} />
        <Route
          path="/orphanages/edit/:id"
          component={EditOrphanage}
          isPrivate
        />

        <Route path="/orphanage/delete/:id" component={DeletePage} isPrivate />

        <Route path="/orphanages/:id" component={Orphanage} />

        <Route path="/login" component={Login} />

        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword/:id" component={ResetPasswrod} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
