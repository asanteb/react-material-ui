import React from 'react';
import Dialog from 'material-ui/Dialog';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 0,
  },
  modal: {
    width: '75%',
    height: '50%'
  }
};

export default class newToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      open: false
    };
  }


  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  enterSearch = (event) => {
    if(event.keyCode == 13){
      console.log(this.state.value);
      this.searchModalOpen();
    }
  };

  searchModalOpen = () => {
    this.setState({open: true});
    console.log('This working?');
  };

  searchModalClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="All Broadcasts" />
            <MenuItem value={2} primaryText="All Voice" />
            <MenuItem value={3} primaryText="All Text" />
            <MenuItem value={4} primaryText="Complete Voice" />
            <MenuItem value={5} primaryText="Complete Text" />
            <MenuItem value={6} primaryText="Active Voice" />
            <MenuItem value={7} primaryText="Active Text" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <Dialog
            title="Search Modal"
            contentStyle={styles.modal}
            modal={false}
            open={this.state.open}
            onRequestClose={this.searchModalClose}
          >
            <h1> "This is what you searched for:" {this.state.value}</h1>
          </Dialog>
          <TextField
            ref='search'
            id="text-field-controlled"
            hintText= "Search"
            onChange={this.handleChange}
            onKeyDown={this.enterSearch}
          />
        </ToolbarGroup>
        <ToolbarGroup>
        <Badge
              badgeContent={10}
              secondary={true}
              badgeStyle={{top: 14, right: 14}}
            >
              <IconButton tooltip="Notifications"
                href = 'https://www.google.com'
                iconStyle={{width: 36,height: 36}}
                style={{width: "100%",height: '100%',padding: 0}}
              >
                <NotificationsIcon />
              </IconButton>
            </Badge>
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Profile" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
      </div>
      </MuiThemeProvider>

    );
  }
}
