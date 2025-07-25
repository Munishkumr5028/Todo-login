import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Singup';
import HomeTodo from './components/HomeTodo/HomeTodo';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home-todo"
          element={
            <PrivateRoute>
              <HomeTodo />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
