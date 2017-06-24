import { render } from 'react-dom';
import $ from 'jquery';
import DataActions from 'flux/actions/DataActions.js';

import About from 'components/About.js'
import Artist from 'components/Artist.js'
import Digital from 'components/Digital.js'
import Header from 'components/Header.js'
import Home from 'components/Home.js'
import Management from 'components/Management.js'
import Publishing from 'components/Publishing.js'

import css from '../scss/main.scss';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


class AppInitializer {
  views = {
    'about': About,
    'artist': Artist,
    'digital': Digital,
    'header': Header,
    'home': Home,
    'management': Management,
    'publishing': Publishing,
  }

  buildRoutes(paths, ops) {
    return paths.map((path, i) => {
      switch (ops) {
        case undefined:
          return(
            <Route
              key={i}
              component={ this.views[path] }
              path={`/~vasilisakarelova/wastedtalent/build/${path}`}
              exact
            />
          )
        default:
          return(
            <Route
              key={i}
              component={ this.views[ops] }
              path={`/~vasilisakarelova/wastedtalent/build/${path}`}
              exact
            />
          )
      }
    })
  }

  run() {
    DataActions.getPages((response)=>{
    let paths = [];
    let pathsArtist = [];
    Object.keys(response.pages).map(path => paths.push(path))
    response.posts.map(path => pathsArtist.push(path.url))
    render(
      <Router>
        <div className='main-wrapper'>
          <main className='main-container'>
            <div className='track'>
              <About />
              <Management />
              <Publishing />
              <Digital />
            </div>
            <Switch>
              <Route path="/~vasilisakarelova/wastedtalent/build/" component={ Home } exact />
              {this.buildRoutes(paths)}
              {this.buildRoutes(pathsArtist, 'artist')}
              <Route render={() => { return <Redirect to="/~vasilisakarelova/wastedtalent/build/" /> }} />
            </Switch>
          </main>
        </div>
      </Router>
      , document.getElementById('app')
      );
    });
  }
}

new AppInitializer().run();
