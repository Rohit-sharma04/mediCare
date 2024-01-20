import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

function App() {
  const { loading } = useSelector((state) => state.alerts);

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
