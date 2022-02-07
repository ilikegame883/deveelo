import React from "react";
//https://vega-deployment.herokuapp.com/users
// const EXTERNAL_DATA_URL = "http://localhost:4000/users";
const EXTERNAL_DATA_URL = "https://vega-deployment.herokuapp.com/refresh_token";

const createSitemap = (users) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<url>
			<loc>${`https://www.deveelo.com`}</loc>
		</url>
		${users
			.map(({ account }) => {
				return `
                <url>
                    <loc>${`https://www.deveelo.com/${account.tag}`}</loc>
                </url>
            `;
			})
			.join("")}
    </urlset>
    `;

class Sitemap extends React.Component {
	static async getInitialProps({ res }) {
		//get users
		console.log("start of sitemap fetch from " + EXTERNAL_DATA_URL);
		const request = await fetch(EXTERNAL_DATA_URL, {
			method: "POST",
			credentials: "include",
			mode: "cors",
		});
		const users = await request.json();
		console.log(users);

		res.setHeader("Content-Type", "text/xml");
		res.write(createSitemap(users));
		res.end();
	}
}

export default Sitemap;
