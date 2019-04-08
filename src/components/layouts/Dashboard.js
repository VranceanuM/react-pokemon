import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom'
import axios from 'axios'
import PokemonList from '../pokemon/PokemonList'

const styles = theme =>({
    root:{
        flexGrow:1
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      }
    }
})

class Dashboard extends Component {
  state ={
    url:'https://pokeapi.co/api/v2/pokemon/',
    pokemon:this.props,
    searchText:''
  }
   onTextChange = (e)=>{
   this.setState({searchText:e.target.value})
    
  }
   componentDidMount(){
    axios.get(this.state.url).then(res=>{

      this.setState({pokemon:res.data['results']})
    })
    
  }
  
  render() {
    
   
   
   const {classes} = this.props
    return (
      <div>
          <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                name="searchText"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.searchText}
                onChange={this.onTextChange}
              />
            </div>
            {this.state.pokemons.map((poke) =>{
                return this.filterPokemons(poke)
            })}
             
          
         
      </div>
    )
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);