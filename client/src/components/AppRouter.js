import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes/routes";
import { LOGIN_ROUTE, HOME_ROUTE } from "../routes/path";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  if (user.isAuth) {
    return (
      <Routes>
        {authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

        {publicRoutes.map(({ path }) => (
          <Route
            key={path}
            path={path}
            element={<Navigate to={HOME_ROUTE} />}
          />
        ))}
        <Route key={"*"} path={"*"} element={<Navigate to={HOME_ROUTE} />} />
      </Routes>
    );
  }
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route key={"*"} path={"*"} element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
