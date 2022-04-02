import React from "react";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../../services/CryptoNewsAPI";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const count = simplified ? 10 : 100;

	const { data, isFetching } = useGetCryptoNewsQuery({ count, newsCategory: "Cryptocurrency" });

	if (isFetching) return "Loading.....";

	console.log(data);

	return <></>;
};

export default News;
