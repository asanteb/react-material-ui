import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Paper from 'material-ui/Paper';

import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const imageList = [];
const api = {
    baseUrl: 'http://localhost:3002'
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});



import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign: 'center',
  },

  slide: {
    padding: 10,
  },

  root: {

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  paper: {
    flex: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    display: 'inline-block',
    textAlign: 'center',
    justifyContent: 'space-around'
  },

  gridList: {
    textAlign: 'left',
    width: '75%',
    height: '100%',
    overflowY: 'auto',
    padding: 10
  },

};




export default class TabsExampleSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      users: [],
      hasMoreItems: true,
      nextHref: 0,
    };
  }

  loadItems(page) {
        var self = this;

        var url = api.baseUrl + '/api/user/popular/';
        if(this.state.nextHref < 200) {
            url = url + this.state.nextHref;
            console.log(url);
            var theresMore = this.state.nextHref;
        }

        qwest.get(url)
            .then(function(xhr, resp) {
                if(resp) {
                  console.log(resp);
                    var users = self.state.users;
                    //console.log(users);
                    resp.map((usr) => {
                        users.push(usr);
                        //console.log('usr');
                    });

                    if(theresMore < 200) {
                        self.setState({
                            users: users,
                            nextHref: (theresMore + 10)
                        });
                        console.log(theresMore);
                    } else {
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };


  render() {

    const loader = <div className="loader">Loading ...</div>;
        //console.log(this.state.users);

        var items = [];
        this.state.users.map((usr, i) => {1
          console.log('yes?');
            console.log(usr);
            var normalizePic;
            if (usr.picture.includes("default_profile")){
              if (usr.picture.includes(".jpg")){
                normalizePic = usr.picture.replace(".jpg", "_bigger.jpg");
              }
              else {
                normalizePic = usr.picture.replace(".png", "_bigger.png");
              }
            }
            else {
              if (usr.picture.includes(".jpg")){
                normalizePic = usr.picture.replace(".jpg", "_bigger.jpg");
              }
              else {
                normalizePic = usr.picture.replace(".png", "_bigger.png");
              }
            }

            console.log("Hi" , normalizePic);
            items.push(

                <div className="usr" key={i}>
                    <a href={"https://twitter.com/" + usr.username} target="_blank">
                        <img src={normalizePic} width="150" height="150" />
                        <p className="title">{usr.displayname}</p>
                    </a>
                </div>
            );
        });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
      {/* TAB CONTENTS HERE */}
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Hot" value={0} />
          <Tab label="Newest" value={1} />
          <Tab label="Friends" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >

        {/*FIRST TAB SHOWS HOTTEST USERS*/}

          <div Tab1 style={styles.slide}>
          {/*HEADER FOR HOT TAB*/}
            <h2 style={styles.headline}>Most popular people on the market</h2>
                <h3 style={styles.headline}> Swipe to see the next slide.<br /></h3>
              {/*USER GRID*/}
              <div style={styles.headline}>
              <Paper
                style={styles.paper}
                zDepth={2}
                autoScrollBodyContent={true}>
                <div style={styles.root}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}>
                    <div className="users">
                      {items}
                    </div>
                  </InfiniteScroll>
                </div>
              </Paper>
              </div>
          </div>

          {/*SECOND TAB SHOWS NEWEST USERS ON MARKET*/}

          <div Tab2 style={styles.slide}>
            <h2 style={styles.headline}>Newest people on the market</h2>
              slide n°2
          </div>

          {/*THIRD TAB SHOWS USERS THAT ARE FRIENDS OF CURRENT USER*/}

          <div Tab3 style={styles.slide}>
            <h2 style={styles.headline}>Your friends on the market</h2>
              slide n°3
          </div>

          {/*END OF TABS*/}

        </SwipeableViews>
      </div>
      </MuiThemeProvider>

    );
  }
}
