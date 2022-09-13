import { Spinner } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CHECKAUTH } from "./http/userAPI";
import { processToken } from "./http/auth";
import AppRouter from "./components/AppRouter";
import { Context } from "./index";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [checkAuth] = useMutation(CHECKAUTH);
  useEffect(() => {
    checkAuth()
      .then(({ data }) => {
        console.log("Auth-", data);
        const token = data?.public?.auth?.token;
        if (token) {
          const decodedData = processToken(token);
          user.setUser(decodedData);
          user.setIsAuth(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
