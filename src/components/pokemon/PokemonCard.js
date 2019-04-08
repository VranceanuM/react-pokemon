import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Spiner from './spin.gif'

const styles = theme => ( {
    card:{
        maxWidth:245,
        marginLeft:20

    },
    root: {
        flexGrow: 1,
      },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
})
class PokemonCard extends Component {
  state = {
    name:"",
    imgUrl:"",
    pokemonIndex:"",
    imgLoading:true,
    contentLoad:true,
    isLoading: true,
    description:''
  }
  async componentDidMount(){
    
    const {name , url } = this.props
    const pokemonIndex = url.split('/')[url.split('/').length -2];
    const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    this.setState({
      name,
      imgUrl,
      pokemonIndex,
      isLoading:false

    })
  }
  // renderName = n =>{
  //   const {searchText} =this.props
  //   if(searchText !== "" && n.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1){
  //     return null
  //   }
  // }
  render() {
    // let data;
    // if(this.state.isLoading){
    //   data = <img data-src={require('./spin.gif')}/>
    // }
    const { classes } = this.props;
   
    return (
      <div>

        <Grid container style={{marginTop:50}}>
          <Link to={`pokemon/${this.state.pokemonIndex}`}>
            <Card className={classes.card}>
            <CardActionArea>
              {this.state.imgLoading ? (<img src={Spiner}></img>):(null)}
                <CardMedia
                onLoad={() => this.setState({imgLoading:false})}
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="140"
                src="#"
                image={this.state.imgUrl}
                title="Pokemon"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {this.state.name.toLowerCase().split(' ').map(
                      letter =>letter.charAt(0).toUpperCase() + letter.substring(1)
                    )}
                </Typography>
                <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
        </Link>
         </Grid>
      </div>
    )
  }
}
PokemonCard.propTypes ={
    classes:PropTypes.object.isRequired,
};
export default withStyles(styles)(PokemonCard);

