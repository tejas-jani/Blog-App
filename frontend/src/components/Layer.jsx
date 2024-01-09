import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const Layer = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};
export default Layer;
