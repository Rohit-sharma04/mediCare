import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { useEffect } from "react";
import { checkAndRemoveExpiredToken } from "./lib/helper";

function App() {
  const { loading } = useSelector((state) => state.alerts);


  useEffect(() => {
    checkAndRemoveExpiredToken();
  }, [])

  return (
    <>
      {
        loading ? <Spinner /> :
          (<RouterProvider
            router={router}
            fallbackElement={<Spinner />}>
          </RouterProvider>
          )
      }
    </>
  );
}

export default App;
