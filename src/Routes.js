import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Landing as LandingView,
  NotFound as NotFoundView,
  Login as LoginView,
  InputKegiatan as InputKegiatanView,
  Pengaturan as PengaturanView,
  Dashboard as DashboardView,
  Register as RegisterView,
  Welcome as WelcomeView,
  HistoryKegiatan as HistoryKegiatanView,
  InputKegiatanNonFisik as InputKegiatanNonFisikView,
  HistoryKegiatanNon as HistoryKegiatanNonView,
  HistoryKegiatanView as HistoryView,
  HistoryKegiatanNonView as HistoryNonView,
  SignOut,
} from "./views";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/landing" />
        </Route>
        <RouteWithLayout
          component={WelcomeView}
          exact
          layout={MainLayout}
          path="/welcome"
        />
        <RouteWithLayout
          component={InputKegiatanView}
          exact
          layout={MainLayout}
          path="/input-kegiatan"
        />
        <RouteWithLayout
          component={InputKegiatanNonFisikView}
          exact
          layout={MainLayout}
          path="/input-kegiatan-non-fisik"
        />
        <RouteWithLayout
          component={HistoryKegiatanNonView}
          exact
          layout={MainLayout}
          path="/history-kegiatan-non-fisik"
        />
        <RouteWithLayout
          component={LoginView}
          exact
          layout={MinimalLayout}
          path="/login"
        />
        <RouteWithLayout
          component={HistoryNonView}
          exact
          layout={MainLayout}
          path="/history-non"
        />
        <RouteWithLayout
          component={HistoryView}
          exact
          layout={MainLayout}
          path="/history"
        />
        <RouteWithLayout
          component={LandingView}
          exact
          layout={MinimalLayout}
          path="/landing"
        />
        <RouteWithLayout
          component={HistoryKegiatanView}
          exact
          layout={MainLayout}
          path="/history-kegiatan"
        />
        <RouteWithLayout
          component={InputKegiatanView}
          exact
          layout={MainLayout}
          path="/input-kegiatan"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />

        <RouteWithLayout
          component={PengaturanView}
          exact
          layout={MainLayout}
          path="/pengaturan"
        />
        <RouteWithLayout
          component={RegisterView}
          exact
          layout={MinimalLayout}
          path="/register"
        />
        <RouteWithLayout
          component={SignOut}
          exact
          layout={MinimalLayout}
          path="/sign-out/675213hdsbjjsankdig6723"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
