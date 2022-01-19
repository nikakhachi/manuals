import React, { useState, useEffect } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { Loading } from "./Loading";
import { api } from "../utils/api";

interface Props extends RouteProps {
  layout?: React.ComponentType<any>;
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<Props> = ({ layout, component, ...rest }) => {
  const { isLoaded } = useSelector((state: RootState) => state.user);
  const { isAuthorized } = useSelector((state: RootState) => state.user);
  const [verified, setVerified] = useState<any>();

  useEffect(() => {
    (async function () {
      const { data } = await api.get("/api/Authorize/ChechVerification");
      setVerified(data);
    })();
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        verified ? (
          !isLoaded ? (
            <Loading />
          ) : isAuthorized && verified ? (
            layout ? (
              React.createElement(
                layout,
                props,
                React.createElement(component, props)
              )
            ) : (
              React.createElement(component, props)
            )
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          " "
        )
      }
    />
  );
};

export default PublicRoute;
