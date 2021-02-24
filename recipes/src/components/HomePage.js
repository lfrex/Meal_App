import React,{Component} from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

class HomePage extends Component{
  constructor(props){
    super(props);
    this.state={
      ingredient:'',
      suggestions: this.props.ingredients,
      ingredientAuxiliar:'',
      randomMeal: {},

    }
  }
  handleChange=(e)=>{
    const {name,value}=e.target;
    const stringToSearch=e.target;
    // Using indexOf to search inide an array
    // Reference: https://stackoverflow.com/questions/5324798/how-to-search-an-array-in-jquery-like-sql-like-value-statement
    let suggestions=this.props.ingredients;
    if(e.target.value){
      suggestions=this.props.ingredients.filter(ingredient=>
        ingredient.toLowerCase().indexOf(e.target.value.toLowerCase()) >-1
      )
    }
    this.setState({
      [name]:value,
      suggestions: suggestions
    })
  }
  async componentDidMount(){
    const randomMeal=await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    this.setState({
      randomMeal:randomMeal.data.meals[0]
    })
  }

  render(){
    return(
      <div>
        <div>Inside HomePage</div>

        <div className='div-header'>Search By Category</div>

        <form onSubmit={(e)=>{this.props.searchCategory(e)}} >
          <label htmlFor='category'> </label>
          <select name='category'>
            {this.props.categories.map((category,index)=>(
              <option
                key={'category-search-option-'+index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {/* <Link to={"/results"}> */}
            <input type='submit' value='Search'/>
          {/* </Link> */}

        </form>

        <br></br>
          
        <div className='div-header'>Search By Area</div>

        <form onSubmit={(e)=>{this.props.searchArea(e)}} >
          <label htmlFor='area'> </label>
          <select name='area'>
            {this.props.areas.map((area,index)=>(
              <option
                key={'area-search-option-'+index}
                value={area}
              >
                {area}
              </option>
            ))}
          </select>
          {/* <Link to={"/results"}> */}
            <input type='submit' value='Search'/>
          {/* </Link> */}
        </form>
              <br></br>

        <div className='div-header'>Search By Ingredient</div>

        <form onSubmit={(e)=>{this.props.searchIngredient(e)}} >
          <label htmlFor='ingredient'> </label>
          <input
            type='text'
            name='ingredientAuxiliar'
            value={this.state.ingredientAuxiliar}
            onChange={this.handleChange}
          />
          <select name='ingredient'>
            {this.state.suggestions.map((ingredient,index)=>(
              <option
                key={'ingredient-search-option-'+index}
                value={ingredient}
              >
                {ingredient}
              </option>
            ))}
           
          </select>
          {/* <Link to={"/results"}> */}
            <input type='submit' value='Search'/>
          {/* </Link> */}
        </form>
        <br></br>
          <button className='button'
            onClick={(e)=>this.props.selectMealById(e,this.state.randomMeal.idMeal)}
          >
            Choose a random meal!
          </button>


      </div>
    )
  }
}

export default HomePage;
