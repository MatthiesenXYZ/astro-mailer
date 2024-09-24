import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	site: "https://mailer.studiocms.xyz",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	security: {
		checkOrigin: false,
	},
	experimental: {
		env: {
			validateSecrets: false,
			schema: {
				SENDGRID_API_KEY: envField.string({
					context: "server",
					access: "secret",
				}),
			},
		},
	},
});
