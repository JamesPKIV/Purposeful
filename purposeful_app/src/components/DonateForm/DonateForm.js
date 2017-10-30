import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DonateForm.css';
import NavBar from '../NavBar/NavBar';
import working from "../App/still_working.png";


const info = ["One time"];

class DonateForm extends Component {

	constructor() {
		super();
		/* Need to bind this keyword to function before */ 
		this.proceed = this.proceed.bind(this);
		this.setInfo = this.setInfo.bind(this);
		this.state = {
			content: <Amount proceed={this.proceed} setInfo={this.setInfo} />
		};
	}

	setInfo(idx,  value){
		let i = 0;
		while(i < idx + 1 ){
			if(i == idx){
				info[i] = value;
			}
			i++;
		}
		console.log(info[0]);
		console.log(info[1]);
	}

	proceed (value) {
		switch (value) {
			case 'amount':
				this.setState({
					content: <Amount proceed={this.proceed} setInfo={this.setInfo}  /> 
				})
				break;
			case 'details':
				this.setState({
					content: <Details proceed={this.proceed} />
				});
				break;
			case 'payment':
				this.setState({
					content: <Payment proceed={this.proceed}/>
				});
				break;
			case 'finalize':
				this.setState({
					content: <Finalize proceed={this.proceed}/>
				});
				break;
		}
	}

	Desktop() {
		return (
			<div className="donate-container">
				<NavBar />
				<div className="container">
					<div className="row valign-wrapper ">
						<div className="col s6"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</div>
						<div className="col s6">
							{this.state.content}
						</div>
					</div>
				</div>
			</div>
		);
	}
	Mobile() {
		return (
			<span>
				<NavBar />
				<div>
					<img src={working} alt="working" width="100vw" className="row center" />
					<p className="row"> Thanks for your support, this option will be open soon!</p>
					<Link to="/landing" className="center btn light-green row">Back to Landing Page </Link>
				</div>
			</span>
		);
	}

	render() {
		if (window.innerWidth > 700) {
			return (
				this.Desktop()
			);
		} else {
			return (
				this.Mobile()
			);
		}
	}
}

class Amount extends Component {
	render() {
		return (
			<div>
				 Donation Amount
			  <div className="row">
					<div className="col s4">
						<button className="btn amounts" onClick={() => this.props.setInfo(1, 25)}> $25 </button>
					</div>
					<div className="col s4">
						<button className="btn amounts" onClick={() => this.props.setInfo(1, 50)}> $50 </button>
					</div>
					<div className="col s4">
						<button className="btn amounts" onClick={() => this.props.setInfo(1, 100)}> $100 </button>
					</div>
				</div>
				<div className="row">
					<div className="col s4">
						<input name="group1" type="radio" id="one-time"/>
						<label for="one-time" >One time</label>
					</div>
					<div className="col s4">
						<input name="group1" type="radio" id="recurring"/>
						<label for="recurring" >Recurring</label> 
					</div>
				</div>
				<div> 
					<input className="other-amount" placeholder="Other Amount"/> 
				</div> 

				<button className="btn" onClick={() => this.props.proceed('details')}> Next</button>
			</div>
		);
	}
}

class Details extends Component {
	render() {
		return (
			<div> Details
				<button className="btn" onClick={() => this.props.proceed('payment')}> Next </button>
				<button className="btn" onClick={() => this.props.proceed('amount')}> Back</button>
			</div>
		)
	}
}

class Payment extends Component {
	render(){
		return(
			<div> Payment
				<button className="btn" onClick={() => this.props.proceed('finalize')}> Next </button>
				<button className="btn" onClick={() => this.props.proceed('details')}> Back</button>
			</div>
		)
	}
}

class Finalize extends Component{
	render(){
		return(
			<div>
				This will be the final component before donation is placed
			</div>
		)
	}
}

export default DonateForm;
