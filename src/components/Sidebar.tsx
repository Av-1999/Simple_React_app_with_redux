import { useEffect } from "react";
import styled from "styled-components";
import { getImagesByCatgory } from "../redux/action";
import { selectCategories } from "../redux/selectors";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

interface ISidebar {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Sidebar = (props: ISidebar) => {
  const { isOpen, setIsOpen } = props;

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state: RootState) =>
    selectCategories(state)
  );

  const setCategory = (id: number) => {
    dispatch(getImagesByCatgory(id));
  };

  useEffect(() => {
    if (window.innerWidth > 650) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
    window.addEventListener("resize", resizing);
    return () => {
      window.removeEventListener("resize", resizing)
    }
  }, []);

  const resizing = () => {
    if (window.innerWidth > 650) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  };

  if (!isOpen) return <></>;
  return (
    <Container>
      {categories.map((e: { name: string; id: number }) => (
        <SListItem key={e.id} onClick={() => setCategory(e.id)}>
          {e.name}
        </SListItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 300px;
  height: 100%;
  background: whitesmoke;
`;
const SListItem = styled.button`
  width: 100%;
  padding: 1rem;
`;