import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import en from "react-intl/locale-data/en";
import vi from "react-intl/locale-data/vi";
import { IntlProvider, addLocaleData } from "react-intl";
import Loadable from 'react-loadable';

import messages from './messages';

import LoadableLoading from './common/LoadableLoading';

const LocationMapLoader = Loadable({
  loader: () => import('./components/LocationMap'),
  loading: LoadableLoading,
  delay: 50
});

addLocaleData([...vi, ...en]);
function App(props) {
  const { lang } = props;
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Switch>
        <Route path="/" exact render={props => <LocationMapLoader {...props} />} />
      </Switch>
    </IntlProvider>
  );
}

const mapStateToProps = state => {
  return { lang: state.locale.lang }
};

export default connect(mapStateToProps, {})(App);
