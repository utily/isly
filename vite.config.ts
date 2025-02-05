/// <reference types="vitest/config" />
import { defineConfig } from "vite"

export default defineConfig({
	test: {
		typecheck: {
			tsconfig: "./tsconfig.json",
		},
		coverage: {
			reporter: ["text", "json", "html"],
			enabled: true,
			all: true,
			cleanOnRerun: true,
			thresholds: {
				statements: 35,
				branches: 80,
				functions: 50,
				lines: 35,
			},
		},
		globals: true,
		include: ["**/*.spec.[tj]s"],
		testTimeout: 20000,
		isolate: false,
		exclude: ["node_modules", "dist"],
		server: {
			deps: {
				inline: [
					"authly",
					"isly",
					"typedly",
					"cloudly-analytics",
					"cryptly",
					"isoly",
					"cloudly-http",
					"sessionly",
					"flagly",
					"cloudly-storage",
					"cloudly-rest",
					"tidily",
					"gracely",
					"cloudly-router",
					"selectively",
					"langly",
				],
			},
		},
	},
})
