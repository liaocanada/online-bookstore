import React from "react";
import MyPieChart from "../../components/insights/MyPieChart";
import Layout from "../../components/Layout";
import config from "../../config/config";

class Income extends React.Component {

    static async getInitialProps(context) {
        // TODO promise.all
		const byProductRes = await fetch(config.API_GATEWAY_ENDPOINT + "/insights/income/byProduct");
		const byMonthRes = await fetch(config.API_GATEWAY_ENDPOINT + "/insights/income/byMonth");

		return {
			incomeByProduct: await byProductRes.json(),
			incomeByMonth: await byMonthRes.json(),
		};
	};

    render() {
        const { incomeByProduct, incomeByMonth } = this.props;

        // TODO do this for all month/year
        const aprilData = incomeByMonth.find(element => element.month === 4 && element.year === 2020);
        const formattedAprilData = [
            { title: "Profits", value: parseFloat(aprilData.profit) },
            { title: "Commission", value: parseFloat(aprilData.commission) },
            { title: "Delivery", value: parseFloat(aprilData.delivery_fee) },
            { title: "Taxes", value: parseFloat(aprilData.taxes) },
        ];

        return (
            <Layout>
                <h1>Income by product</h1>
                <MyPieChart data={incomeByProduct} titleKey="name" valueKey="profit" />
                <h1>Income for April 2020</h1>
                <MyPieChart data={formattedAprilData} />
            </Layout>
        );
    }
}

export default Income;