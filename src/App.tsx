import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ContactDetails from "@pages/contactDetails";
import ContactsList from "@pages/contactsList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/contacts/:contactId" element={<ContactDetails />} />
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/" element={<Navigate to="/contacts" />} />
      </Routes>
    </Router>
  );
};

export default App;
