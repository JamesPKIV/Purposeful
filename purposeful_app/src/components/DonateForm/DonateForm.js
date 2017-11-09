import React, { Component } from 'react';
import './DonateForm.css';
import NavBar from '../NavBar/NavBar';
import interactionsImg from '../AboutPurposeful/interactions.jpg';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import FaDollar from 'react-icons/lib/fa/dollar';

class DonateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: "25.00",
			selected: "One time",
			fname: "",
			lname: "",
			address: "",
			zip: "",
			sstate: "",
			creditcardholder: "",
			creditNum: "",
			expDate: "",
			securityCode: "",
			content: "amount"
		};
		this.proceed = this.proceed.bind(this);
		this.setAmount = this.setAmount.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	// change state content value
	proceed(value){
		this.setState({
			content: value
		});
	}

	// set dontation amount
	setAmount(ev) {
		this.setState({
			amount: ev.target.value
		});
		// change style of button for the one selected
	}

	// handle change for inputs
	handleChange(ev){
		this.setState({
			[ev.target.name]: ev.target.value
		});
		console.log(this.state[ev.target.name]);
	}

	// set content to show
	setContent(value) {
		switch (value) {
			case 'amount':
				return this.amountContent();
			case 'details':
				return this.detailsContent();
			case 'payment':
				return this.paymentContent();
			case 'finalize':
				return this.finalizeContent();
			default:
				break;
		}
	}


	// donation amount
	amountContent() {
		return (
			<div> <span className="component-title"> Your Support </span>
				<div className="row">
					<div className="col s3 m3 l3">
						<button className="btn amounts" value="25.00" onClick={(e) => this.setAmount(e)}> $25 </button>
					</div>
					<div className="col s3 m3 l3">
						<button className="btn amounts" value="50.00" onClick={(e) => this.setAmount(e)}> $50 </button>
					</div>
					<div className="col s3 m3 l3">
						<button className="btn amounts" value="100.00" onClick={(e) => this.setAmount(e)}> $100 </button>
					</div>
					<div className="col s3 m3 l3">
						<button className="btn amounts" >Other</button>
					</div>
				</div>
				<div className="row" >
					<form onSubmit={() => this.proceed('details')}>
						<div className="row">
							<div className="col s5 m4 l4">
								<label className="label-radio"> One Time
									<input type="radio" value="One time" name="selected" checked={this.state.selected === "One time"} onChange={(e) => this.handleChange(e)} />
								</label>
							</div>
							<div className="col s5 m4 l4">
								<label className="label-radio"> Monthly Recurring
									<input type="radio" value="Recurring" name="selected" checked={this.state.selected === "Recurring"} onChange={(e) => this.handleChange(e)} />
								</label>
							</div>
						</div>
						<div className="row">
							<div className="amount col s6 m6 l6">
								<FaDollar className="fa-dollar" />
								<input className="amt-input" value={this.state.amount} />
							</div>
							<button className="btn" type="submit" > Continue <FaArrowRight /></button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	// person details
	detailsContent(){
		return (
			<div> <span className="component-title">Details</span>
				<div className="row">
					<div className="col s4 m4 l4">
						<label className="input-label" >First name </label>
						<input type="text" className="input-style" name="fname" value={this.state.fname} onChange={(e) => this.handleChange(e)}/>
					</div>
					<div className="col s4 m4 l4">
						<label className="input-label">Last name</label>
						<input type="text" className="input-style" name="lname" value={this.state.lname} onChange={(e) => this.handleChange(e)}/>
					</div>
				</div>
				<div className="row">
					<div className="col s4 m4 l4">
						<label className="input-label">Address </label>
						<input type="text" className="input-style" name="address" value={this.state.address} onChange={(e) => this.handleChange(e)} />
					</div>
					<div className="col s4 m4 l4">
						<label className="input-label">Zip Code</label>
						<input type="text" className="input-style" name="zip" value={this.state.zip} onChange={(e) => this.handleChange(e)} />
					</div>
					<div className="col s4 m4 l4">
						<label className="input-label">State </label>
						<input type="text" className="input-style" name="sstate" value={this.state.sstate} onChange={(e) => this.handleChange(e)}/>
					</div>
				</div>
				<button className="btn back-btn" onClick={() => this.proceed('amount')}> <FaArrowLeft /> Back</button>
				<button className="btn continue-btn" onClick={() => this.proceed('payment')}>Continue <FaArrowRight /> </button>
			</div>
		);
	}

	// payment details
	paymentContent(){
		return (
			<div> <span className="component-title"> Credit Card Info </span>
				<div className="row">
					<div className="col s6">
						<label className="input-label"> Cardholder Name </label>
						<input type="text" className="input-style" name="creditcardholder" value={this.state.creditcardholder} onChange={(e) => this.handleChange(e)} />
					</div>
					<div className="col s6">
						<label className="input-label"> Credit/Debit Card Number </label>
						<input type="text" className="input-style" name="creditNum" value={this.state.creditNum} onChange={(e) => this.handleChange(e)}/>
					</div>
				</div>
				<div className="row">
					<div className="col s3 m3 l3">
						<label className="input-label"> Expiration Date </label>
						<input type="date" className="input-style" name="expDate" value={this.state.expDate} onChange={(e) => this.handleChange(e)}/>
					</div>
					<div className="col s3 m3 l3">
						<label className="input-label"> Security Code </label>
						<input type="text" className="input-style" name="securityCode" value={this.state.securityCode} onChange={(e) => this.handleChange(e)}/>
					</div>
				</div>
				<button className="btn back-btn" onClick={() => this.proceed('details')}> <FaArrowLeft /> Back</button>
				<button className="btn continue-btn" onClick={() => this.proceed('finalize')}> Continue <FaArrowRight /> </button>
			</div>
		);
	}

	// finalize details
	finalizeContent() {
		return (
			<div>
				This will be the final component before donation is placed
				<button className="btn back-btn" onClick={() => this.proceed('payment')}> <FaArrowLeft /> Back</button>
			</div>
		);
	}

	render() {
		return (
			<div className="donate-container">
				<NavBar />
				<div className="container main-content">
						<div className="row">
							<div className="col s12 m6">
								<img id="interactions-img" src={interactionsImg} alt=""/>
								<div id="donation-desc">
									Your donation will help continue to support the development and maintence of the website.
								</div>
							</div>
							<div className="col s12 m6">
								{this.setContent(this.state.content)}
							</div>
						</div>
				</div>
			</div>
		);
	}
}

export default DonateForm;
