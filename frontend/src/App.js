import { Route, Routes, Navigate } from "react-router-dom";
import SignUpScreen from "./screens/SignUpScreen";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginFormScreen from "./screens/LoginFormScreen";
import { HomeScreen } from "./screens/organizationViewScreen/HomeScreen";
import { FormFieldsScreen } from "./screens/organizationViewScreen/FormFieldsScreen";
import { FormScreen } from "./screens/organizationViewScreen/FormScreen";
function App() {
  return (
    <Routes>
      {/* setting login page as our landing page of the app */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/org-home" element={<HomeScreen />} />
        <Route path="/form-field" element={<FormFieldsScreen />} />
        <Route path="/form" element={<FormScreen />} />
      </Route>

      <Route path="/register" element={<SignUpScreen />} />
      <Route path="/login" element={<LoginFormScreen />} />
    </Routes>
  );
}

export default App;
