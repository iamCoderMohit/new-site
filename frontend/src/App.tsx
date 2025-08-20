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
      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  )
}

export default App
