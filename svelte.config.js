import { SassAlias } from 'svelte-preprocess-sass-alias-import';
import adapter from '@sveltejs/adapter-node';
import path from 'path';
import preprocess from 'svelte-preprocess';

export const alias = new SassAlias({
	$scss: ['src', 'global', 'scss']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			importer: [alias.resolve.bind(alias)]
		}
	}),

	kit: {
		alias: {
			$global: path.join('src', 'global'),
			$scss: path.join('src', 'global', 'scss'),
			$helpers: path.join('src', 'helpers'),
			$assets: path.join('src', 'assets'),
			$lib: path.join('src', 'lib')
		},
		adapter: adapter()
	}
};

export default config;
