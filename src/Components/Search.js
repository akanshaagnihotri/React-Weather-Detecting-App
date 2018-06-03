import React, {Component} from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
var styles={
	heading:{
		color:"blue",
		marginLeft:500
	},
	input:{
      width:200,
      height:20,
      boxShadow:"1px 1px 1px grey",
      marginLeft:500
	},
	button:{
     backgroundColor:"#6173cc",
		color:"#fff",
		width:70,
		height:30,
		
	},
	innerH1:{color:"red"}

}

class Search extends React.Component{
	constructor(props){
		super(props);
		this.state={
			initial:"",
			searchArray:[]
		}
		this.reloadArray=this.reloadArray.bind(this);
}
	reloadArray(){
		const url="http://api.openweathermap.org/data/2.5/weather?q="+this.state.initial+"&appid=53dc6d1030eb1d0725ad310f410a6695";
		axios.get(url).then((response)=>{
			console.log(response.data);
			console.log(response.data.name);
			console.log(response.data.humidity);
          this.setState({
          	searchArray:response.data
          })
		}).catch((err)=>{
			this.setState({searchArray:[]})
          console.log("some error",err);
		})
	}
	render(){
		return(
			<div>
			 <centre> <h1 style={styles.heading} >Weather application</h1></centre>
			  <input style={styles.input} value={this.state.initial} onChange={(event)=>{this.setState({initial:event.target.value})}}/>
			  <button style={styles.button} onClick={this.reloadArray}>Search</button>
			  <br/>
		     {
		     	(this.state.searchArray.length==0)?
		     	(<h1 style={styles.innerH1} >Know the weather  Of any City</h1>):
		     	(  <WeatherCard   name={this.state.searchArray.name} name={this.state.searchArray.name} pressure={this.state.searchArray.main.pressure} visibility={this.state.searchArray.visibility} humidity={this.state.searchArray.main.humidity} temperature={this.state.searchArray.main.temp} >
		     		</WeatherCard>)
		     }

			</div>
			)
	}
}
export default Search;