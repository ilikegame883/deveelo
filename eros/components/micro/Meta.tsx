import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/faviconround.ico" />
			<title>{title}</title>
			<meta property="og:image" content="https://deveelo.vercel.app/largeLogo.png"></meta>
			<meta property="og:title" content="Deveelo"></meta>
			<meta property="og:url" content="deveelo.vercel.app"></meta>
			<meta property="og:description" content="Social media platform for cool people only"></meta>
		</Head>
	);
};

Meta.defaultProps = {
	title: "Deveelo",
	keywords: "game development, devlogs, beta testing, game dev",
	description: "Share your game dev work, art, build communities, host beta tests, and connect with other creators",
};

export default Meta;
