import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
	const [people, setPeople] = useState(data);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const lastPeopleIndex = people.length - 1;

		if (index < 0) {
			setIndex(lastPeopleIndex);
		}
		if (index > lastPeopleIndex) {
			setIndex(0);
		}
	}, [index, people]);

	//auto slider is done using this useEffect
  //this is the most toughest part
	useEffect(() => {
		let slider = setInterval(() => {
			setIndex(index + 1);
		}, 3000);
		return () => clearInterval(slider);
	}, [index]);

	return (
		<section className="section">
			<div className="title">
				<h3>
					<span>/</span>
					Reviews
				</h3>
			</div>
			<div className="section-center">
				{people.map((each, eachIndex) => {
					let position = "nextSlide";
					if (eachIndex === index) {
						position = "activeSlide";
					} else if (
						eachIndex === index - 1 ||
						(index === 0 && eachIndex === people.length - 1)
					) {
						position = "lastSlide";
					}
					return (
						<article key={each.id} className={position}>
							<img src={each.image} alt={each.name} className="person-img" />
							<h4>{each.name}</h4>
							<p className="title">{each.title}</p>
							<p className="text">{each.quote}</p>
							<FaQuoteRight className="icon" />
						</article>
					);
				})}
				<button className="prev" onClick={() => setIndex(index - 1)}>
					<FiChevronLeft />
				</button>
				<button className="next" onClick={() => setIndex(index + 1)}>
					<FiChevronRight />
				</button>
			</div>
		</section>
	);
}

export default App;
