import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Explore from './pages/Explore'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import CheckOut from './pages/CheckOut'
import MyCourses from './pages/MyCourses'
import AdminRoute from './components/ProtectedRoute'
import AdminDashboard from './components/AdminDashboard'
import CreateCourse from './components/CreateCourse'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/checkout/:courseId' element={<CheckOut />} />
        <Route path='/myCourses' element={<MyCourses />} />
        <Route path='/admin' element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path='/admin/create' element={
          <AdminRoute>
            <CreateCourse />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  )
}

export default App
