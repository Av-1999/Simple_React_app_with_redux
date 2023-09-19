import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Sidebar } from "../components/Sidebar";
import { setImagesLimit } from "../redux/action";
import { useAppSelector } from "../redux/store";
import menuIcon from "../assets/menu.png";
import { useState } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const images = useAppSelector((state) => state.app.images);
  const limit = useAppSelector((state) => state.app.limit);

  const [isOpen, setIsOpen] = useState(false);

  const loadMore = () => {
    dispatch(setImagesLimit(limit + 10));
  };

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <SIconMenu
        onClick={openMenu}
        src={menuIcon}
        alt="menu icon"
        isOpen={isOpen}
      />
      <SImageListBox>
        {images.map((e, index) => (
          <SImage key={`${e.id} + ${index}`} src={e.url} alt="image" />
        ))}
      </SImageListBox>
      <SButton onClick={loadMore}>Load MORE</SButton>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 300px);
  height: 100%;
  float: right;
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const SImageListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
  padding: 10px;
`;
const SImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const SButton = styled.button`
  width: 100%;
  object-fit: cover;
  border: none;
  border-radius: 2rem;
  padding: 10px 20px;
  background: yellow;
`;
const SIconMenu = styled.img<{isOpen?: boolean}>`
  width: 25px;
  height: 25px;
  position: fixed;
  top: 10px;
  left: 10px;
  background: lightgray;
  @media (min-width: 650px) {
    display: none;
  }
`;
