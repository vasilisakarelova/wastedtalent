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
import LoaderImg from 'components/LoaderImg.js'

import css from '../scss/main.scss';

import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';


class AppInitializer {
  views = {
    'about': <About dataPriority={'secondary'}/>,
    'artist': Artist,
    'digital': <Digital dataPriority={'secondary'}/>,
    'header': <Header dataPriority={'secondary'}/>,
    'home': <Home dataPriority={'secondary'}/>,
    'management': <Management dataPriority={'secondary'}/>,
    'publishing': <Publishing dataPriority={'secondary'}/>,
  }

  buildRoutes(paths, ops) {
    return paths.map((path, i) => {
      switch (ops) {
        case undefined:
          return(
            <Route
              key={i}
              render={(props) => (window.innerWidth < 800) ? (this.views[path]) : null }
              path={`/${path}`}
              dataPriority={'secondary'}
              exact
            />
          )
        default:
          return(
            <Route
              key={i}
              component={this.views[ops]}
              path={`/${path}`}
              dataShow={'false'}
              exact
            />
          )
      }
    })
  }

  run() {
    DataActions.getPages((response)=>{
      let images = []
      const n = 35

      for (let i = 0; i < n; i++) {
        images.push( <LoaderImg key={i} /> )
      }

      let paths = [];
      let pathsArtist = [];
      Object.keys(response.pages).map((path,i) => paths.push(path))
      response.posts.map((path,i) => pathsArtist.push(path.url))
      render(
        <Router>
          <div className='main-wrapper'>
            <main className='main-container'>
              <div id="loader-wrapper">
                <div id="loader">
                  <div id="loader-track">
                    { images }
                  </div>
                </div>
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
              </div>
              <Header />
              <Switch>
                <Route path="/" component={ Home } exact />
                {this.buildRoutes(paths)}
                {this.buildRoutes(pathsArtist, 'artist')}
                <Route render={() => { return <Redirect to="/" /> }} />
              </Switch>
            </main>
          </div>
        </Router>
        , document.getElementById('app')
      );
    });
  }
}

new AppInitializer().run()

$(window).on('resize', () => {
  new AppInitializer().run()
})

$(window).on('orientationchange', () => {
  new AppInitializer().run()
})

document.addEventListener('click', () => {
  document.body.classList.add('loaded')
})

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(function(){
    document.body.classList.add('loaded')
  }, 4000);
})
