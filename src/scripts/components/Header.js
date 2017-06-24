import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'

class Header extends React.Component {

  render() {
    let paths = [];
    let allPages = DataStore.getAll().pages;
    let allPosts = DataStore.getAll().posts;
    Object.keys(allPages).map(path => paths.push(path))
    allPosts.map(path => paths.push(path.url))

    return (
      <div className="header">
        <Link to="/" style={{marginRight: '10px'}} >Home</Link>
        {
          paths.map((path,i) => {
            if(path != 'home'){
              return(
                <Link
                    key={i}
                    to={`/${path}`}
                    style={{marginRight: '10px'}}
                    >
                    {path}
                </Link>
              )
            }
          })
        }
        {this.props.children}
      </div>
    );
  }
}

export default Header;
