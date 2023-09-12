import React,{Component} from 'react';
import config from '../../config.dev'
import axios from 'axios';

class MyScreen extends React.Component{
	state = {
	   videoUrl: null
	}
	componentDidMount = () => {
	   this.setVideo();
	}
	setVideo = async () => {
	   
		//this.setState({ videoUrl: `http://localhost:2121/media/courses/625ad64a0a8d551d143281c6/demoVideos/1650120262224-VID_20220322_181150.mp4` });
	
		axios({
			method: "get",
			url: config.baseURL+`/qkSet`, 
		    withCredentials: true
			}).then(res => {
				console.log('res from qkSet ',res);

				axios({
					method: "get",
					url: config.baseURL+`/qkRead`, 
					//data: reqBody,
					withCredentials: true
					}).then(res => {
						console.log('res from qkRead ',res);
					})

			})
	
	}
	
	
	render(){
	   const { videoUrl } = this.state;
	   return(
				<video autoPlay muted controls >
					<source src={videoUrl} type="video/mp4"/>
				</video>
	   )
	}
 }
 export default MyScreen;