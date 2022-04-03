import React, { useState } from "react";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../../services/CryptoNewsAPI";
import { useGetCryptosQuery } from "../../services/CryptoAPI";
import Loader from "../../utils/Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImgUrl = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
	const count = simplified ? 6 : 12;

	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const { data: cryptoNews } = useGetCryptoNewsQuery({ count, newsCategory });
	const { data } = useGetCryptosQuery(count);

	if (!cryptoNews?.value) return <Loader />;

	return (
		<>
			<Row gutter={[24, 24]}>
				{!simplified && (
					<Col span={24}>
						<Select
							showSearch
							className="select-news"
							placeholder="Select a Crypto"
							optionFilterProp="children"
							onChange={(value) => setNewsCategory(value)}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value="Cryptocurency">Cryptocurrency</Option>
							{data?.data?.coins?.map((currency) => (
								<Option key={currency.uuid} value={currency.name}>
									{currency.name}
								</Option>
							))}
						</Select>
					</Col>
				)}

				{cryptoNews?.value.map((news, index) => (
					<Col xs={24} sm={12} lg={8} key={index}>
						<Card hoverable className="news-card">
							<a href={news?.url} alt={news?.name} target="_blank" rel="noopener noreferrer">
								<div className="news-image-container">
									<Title className="news-title" level={4}>
										{news?.name}
									</Title>
									<img
										className="img"
										style={{ maxWidth: "200px", maxHeight: "100px" }}
										src={news?.image?.thumbnail?.contentUrl || demoImgUrl}
										alt={news.name}
									/>
								</div>
								<p>
									{news?.description?.length > 100
										? `${news.description.substring(0, 100)} ...`
										: news?.description}
								</p>

								<div className="provider-container">
									<div>
										<Avatar
											src={
												news?.provider[0]?.image?.thumbnail?.contentUrl || demoImgUrl
											}
										/>
										<Text className="provider-name">{news?.provider[0]?.name}</Text>
									</div>
									<Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default News;
