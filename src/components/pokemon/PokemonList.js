import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
})
export default class PokemonList extends Component {
  state ={
    url:'https://pokeapi.co/api/v2/pokemon/',
    pokemon:null,
   
  }
  async componentDidMount(){
   await axios.get(this.state.url).then(res=>{

      this.setState({pokemon:res.data['results']})
    })
    
  }
  render() {
    const {pokemon} = this.state
   
    const {name} = this.props;
    const {searchText} =this.props;
    return (
    
      <div>
       
        <Grid container>
       
         {pokemon && pokemon.map(pok =>{
        return(
          <Grid item  sm={4}md={2} key={pok.name}>
            <PokemonCard 
            
            name={pok.name}
            url={pok.url}
            />
          </Grid>
                  )
          })} 
        </Grid>
      </div>
    )
  }
}
