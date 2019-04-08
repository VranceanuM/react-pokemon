import React, { Component } from 'react'
import axios from  'axios'
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



const styles = {
    root: {
        flexGrow: 1,
      },
    card: {
      maxWidth: 845,
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
    //   objectFit: 'cover',
        width:100,
        display:'initial'
    },
  };
 class Pokemon extends Component {
    
    state ={
        name:'',
        description:'',
        pokemonIndex:'',
        imageUrl:'',
        types:[],
        stats:{
            hp:'',
            attack:'',
            defence:'',
            speed:'',
            specialAttack:'',
            specialDefense:''
        },
        height:'',
        weight:'',
        eggGroups:'',
        abilities:'',
        evs:'',
        hatchSteps:'',
        genderRatioFemale:'',
        genderRatioMale:'',
        catchRate:'',
       
    }
    async componentDidMount(){
        const{pokemonIndex} =this.props.match.params
        //urls for pokemon info
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
        //Get Pokemon Information
        const pokemonRes = await axios.get(pokemonUrl);
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let {hp,attack,defence,speed,specialAttack,specialDefense} = '';

        pokemonRes.data.stats.map(stat =>{
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat']
                    break;
                case 'attack':
                     attack = stat['base_stat']
                    break;  
                case 'defence':
                     defence = stat['base_stat']
                    break;
                case 'speed':
                    speed = stat['base_stat']
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat']
                    break; 
                case 'special-defense':
                    specialDefense = stat['base_stat']
                    break; 
            }
        })
        const weight = pokemonRes.data.weight;
        const height = pokemonRes.data.height;
        const types = pokemonRes.data.types.map(type =>  type.type.name );
        const abilities = pokemonRes.data.abilities.map(ability =>ability.ability.name);
        const evs = pokemonRes.data.stats.filter(stat => {
            if(stat.effort > 0){
                return true;
            }
            else {
                return false;
            }
        }).map(stat =>{
            return`${stat.effort} ${stat.stat.name}`
        });

        //Get pokemon description,
        
        await axios.get(pokemonSpecies).then(res =>{
            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale =12.5 * res.data['gender_rate'];
            const genderRatioMale = 12.5 * (8- femaleRate);
            const catchRate = Math.round((100/255) * res.data['capture_rate']);
            const eggGroups = res.data['egg_groups'].map(group =>group.name);
            const hatchSteps =255*(res.data['hatch_counter'] + 1);
            let description = ''
            res.data.flavor_text_entries.some(flavor =>{
                if(flavor.language.name === 'en'){
                    description = flavor.flavor_text;
                    return;
                }
            });
        // const femaleRate = res.data['gender_rate'];
        // const genderRatioFemale =res.data['gender_rate'];
        // const genderRatioMale = 12.5 * (8- femaleRate);
        // const catchRate = Math.round((100/255) * res.data['capture_rate']);
        // const eggGroups = res.data['egg_groups'].map(group =>group.name);
        // const hatchSteps =255*(res.data['hatch_counter'] + 1);
        
        console.log(hatchSteps)
        this.setState({
            name,
            imageUrl,
            height,
            hatchSteps,
            genderRatioFemale,
            genderRatioMale,
            catchRate,
            eggGroups
           
        });
        this.setState({
            description,
            pokemonIndex,
            types,
            stats:{
                hp,
                attack,
                defence,
                speed,
                specialAttack,
                specialDefense,
                

            },
            abilities,
            evs,
            weight
        })
        });
      

    }
  render() {
    const { classes } = this.props;
    return (
      <div>
    <Grid container className={classes.root} justify="center">
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          src="#"
          image={this.state.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
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
    </Grid>
      </div>
    )
  }
}
Pokemon.propTypes = {
    classes:PropTypes.object.isRequired,
}
export default withStyles(styles)(Pokemon)