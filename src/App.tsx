import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "./Components/ui/sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
