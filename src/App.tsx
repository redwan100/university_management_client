import MainLayout from "./components/layouts/MainLayout";
import ProtectedRout from "./components/layouts/ProtectedRout";
const App = () => {
  return (
    <ProtectedRout role={undefined}>
      <MainLayout />
    </ProtectedRout>
  );
};
export default App;
