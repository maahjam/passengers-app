import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContactDetail from "@pages/contactDetail";
import ContactsList from "@pages/contactsList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/contacts/:contactId" element={<ContactDetail />} />
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/" element={<Navigate to="/contacts" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
