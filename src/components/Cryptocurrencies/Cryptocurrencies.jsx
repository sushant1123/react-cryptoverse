import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../../services/CryptoAPI";

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	// console.log(searchTerm);

	if (isFetching) return "Loading....";

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((cryptoCurrency) => (
					<Col key={cryptoCurrency?.uuid} xs={24} sm={12} lg={6} className="crypto-card">
						<Link to={`/crypto/${cryptoCurrency?.uuid}`}>
							<Card
								extra={
									<img
										className="crypto-image"
										alt={cryptoCurrency?.iconUrl}
										src={cryptoCurrency?.iconUrl}
									/>
								}
								title={`${cryptoCurrency?.rank}. ${cryptoCurrency?.name}`}
								hoverable
							>
								<p>Price: {millify(cryptoCurrency?.price)}</p>
								<p>Market Cap: {millify(cryptoCurrency?.marketCap)}</p>
								<p>Daily Change: {millify(cryptoCurrency?.change)}</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
