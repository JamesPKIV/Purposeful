import React, { Component } from 'react';
import './SEProfilePage.css';
import profile_pic from './profile-pic-default.jpg';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

class SEProfilePage extends Component {

	constructor (props) {
		super(props);
		this.state = {
			isLoggedIn : false,
			purposeDisplay : false,
			goalsDisplay : false,
			accomplisDisplay: false
		};
  }

	togglePurpose = () => {
		console.log ("toggle activated");
		this.setState({
			purposeDisplay: !this.state.purposeDisplay
		});
	}

	toggleGoals = () => {
		this.setState({
			goalsDisplay: !this.state.goalsDisplay
		});
	}

	toggleAccomplish = () => {
		this.setState({
			accomplishDisplay: !this.state.accomplishDisplay
		});
	}

	purpose_content(){
		if(this.state.purposeDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						My Purpose
						<button onClick={this.togglePurpose} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
					</p>
					<p className="profile-text valign">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
				</div>
			);
		} else {
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						My Purpose
						<button onClick={this.togglePurpose}  className="btn-flat">
							<FaAngleDown className="profile-titles"></FaAngleDown>
						</button>
					</p>
					<p className="profile-text truncate valign">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
				</div>
			);
		}
	}

	goals_content(){
		if(this.state.goalsDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						My Goals
						<button onClick={this.toggleGoals} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
					</p>
					<p className="profile-text valign">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
				</div>
			);
		} else {
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						My Goals
						<button onClick={this.toggleGoals}  className="btn-flat">
							<FaAngleDown className="profile-titles"></FaAngleDown>
						</button>
					</p>
					<p className="profile-text truncate valign">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
				</div>
			);
		}
	}

	accomplish_content(){
		if(this.state.accomplishDisplay){
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						My Achievements
						<button onClick={this.toggleAccomplish} className="btn-flat">
							<FaAngleUp className="profile-titles"></FaAngleUp>
						</button>
					</p>
					<p className="profile-text valign">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
				</div>
			);
		} else {
			return(
				<div className="card-panel">
					<p className="profile-titles ">
						My Achievements
						<button onClick={this.toggleAccomplish}  className="btn-flat">
							<FaAngleDown className="profile-titles"></FaAngleDown>
						</button>
					</p>
					<p className="profile-text truncate valign">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
				</div>
			);
		}
	}

	render(){
		return(
			<div>
				<div className="row fullrow"> <p> </p> </div>
				<div className="row fullrow">

					<div className="col s4">
						<img className="responsive-img circle" src={profile_pic}/>
						<p className="profile-name"> Jane Doe </p>
						<div className="container">
								{this.purpose_content()}
								{this.goals_content()}
								{this.accomplish_content()}
						</div>
					</div>

					<div className="col s8">
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row">
							<div className="col s4">
								<button className="btn-large waves-effect light-green valign-wrapper"> Become their Mentee </button>
							</div>
							<div className="col s4">
								<button className="btn-large waves-effect light-green"> Invite to Collaborate </button>
							</div>
							<div className="col s4">
								<button className="btn-large waves-effect light-green"> Folow their Activity </button>
							</div>
						</div>
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>
						<div className="row"> <p> </p> </div>

						<div className="row">
							<div className="col s10 push-s1">
								<div className="card-panel">
									<p className="profile-titles">
										My Mentors
									</p>
								</div>
								<div className="card-panel">
									<p className="profile-titles">
										My Mentees
									</p>
								</div>
								<div className="card-panel">
									<p className="profile-titles">
										My Stories
									</p>
								</div>
								<div className="card-panel">
									<p className="profile-titles">
										My Collaborations
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default SEProfilePage;
