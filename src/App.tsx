import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { getCatgories, getImages } from "./redux/action";
import { loadingSelector } from "./redux/selectors";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import { routes } from "./routes";

const App = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state: RootState) => loadingSelector(state));

  useEffect(() => {
    dispatch(getCatgories());
    dispatch(getImages());
  }, []);

  if (loading) return <>Loading...</>;
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {routes.map((r) => (
            <Route index={r.path === "/"} key={r.path} element={r.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
