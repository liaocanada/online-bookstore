const withCSS = require('@zeit/next-css');

module.exports = withCSS({
	exportTrailingSlash: true,
	exportPathMap: async function() {
		const paths = {
			"/": { page: "/" },
			"/about": { page: "/about" },
			"/products": { page: "/products" },
		};

		// Testing static export routing
		const products = [
			{id: "pid001", name: "product1", price: 1.00}, 
			{id: "pid002", name: "product2", price: 2.00}, 
		];
		// Result: this must be accessed via client clicks and not through URL
		
		products.forEach(product => {
			paths["/products/" + product.id] = { page: "/products/[id]", query: { id: product.id } };
		});

		return paths;
	}
});
