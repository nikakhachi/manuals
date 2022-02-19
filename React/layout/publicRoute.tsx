import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  layout?: React.ComponentType<any>;
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<Props> = ({ layout, component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (layout ? React.createElement(layout, props, React.createElement(component, props)) : React.createElement(component, props))}
    />
  );
};

export default PublicRoute;
