import { useEffect, useState } from "react";
import useAxios from "./hooks/useAxios";
import Main from "./pages/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { response, loading, error } = useAxios({
    method: "get",
    url: "/columns",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Main columns={data} error={error.message} loading={loading} />
    </DndProvider>
  );
}

export default App;
