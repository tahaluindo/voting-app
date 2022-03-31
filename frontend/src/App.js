import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NomineeProfile from './pages/NomineeProfile'
import Nominees from './pages/Nominees'
import QuickCount from './pages/QuickCount'
import Voting from './pages/Voting'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CreateNominee from './pages/CreateNominee'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    // Deklarasi routing di react js menggunakan react-router-dom
    <Router>
      {/* Header yang digunakan disetiap halaman */}
      <Header />
      <main>
        {/* Switch digunakan untuk merender first child yang cocok dengan path location */}
        {/* Switch tidak required tapi direkomendasikan utk tetap digunakan */}
        <Switch>
          {/* Route digunakan untuk mendeklarasikan path sesuai component yang diinginkan */}
          {/* Route terdapat props yang sering digunakan exact, path dan component */}
          {/* exact tidak required tapi lebih baik digunakan */}
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/user/:id' component={Profile} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/nominees/create' component={CreateNominee} />
          <Route exact path='/nominees/:id' component={NomineeProfile} />
          <Route exact path='/nominees' component={Nominees} />
          <Route exact path='/quick-count' component={QuickCount} />
          <Route exact path='/voting' component={Voting} />
        </Switch>
      </main>

      {/* Header yang digunakan disetiap halaman */}
      <Footer />
    </Router>
  )
}

export default App
