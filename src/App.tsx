import MainLayout from "./components/layouts/MainLayout";
import ProtectedRout from "./components/layouts/ProtectedRout";
const App = () => {
  return (
    <ProtectedRout>
      <MainLayout />
    </ProtectedRout>
  );
};
export default App;
