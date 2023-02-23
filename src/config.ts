export const SITE = {
	title: 'NOX',
	description: 'Your website description.',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	category: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/NoxOrg/Nox.Docs/tree/main`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'Overview': [
			{ text: 'Introduction', link: 'en/introduction' },
			{ text: 'How It Works', link: 'en/how-it-works' },
			{ text: 'Getting Started', link: 'en/page-2' },
		],
		'Nox.Lib': [
			{ text: 'About', link: 'en/nox.lib-about' },
			{ text: 'Sample Project', link: 'en/nox.lib-sample-project' },
			{ text: 'Exploring the API', link: 'en/nox.lib-exploring-the-api' },
			{ text: 'Loaders', link: 'en/page-4' },
		],
		'Nox.Cli': [
			{ text: 'About', link: 'en/nox.cli-about' },
			{ text: 'Installation', link: 'en/nox.cli-installation' },
			{ text: 'Sample Project', link: 'en/nox.cli-sample-project' },
			{ text: 'Manifest File', link: 'en/nox.cli-manifest-file' },
		],
		'Api': [
			{ text: 'Rest/OData', link: 'en/page-4' },
			{ text: 'GraphQL', link: 'en/page-4' },
			{ text: 'gRPC', link: 'en/page-4' },
		],
	},
};

export const SIDEBAR_DOCS: Sidebar = {
	en: {
		'Overview': [
			{ text: 'Introduction', link: 'en/introduction' },
			{ text: 'Getting Started', link: 'en/page-2' },
		],
		'Core': [
			{ text: 'Services', link: 'en/nox.lib-about' },
			{ text: 'Entities', link: 'en/page-4' },
			{ text: 'Attributes', link: 'en/page-4' },
			{ text: 'Loaders', link: 'en/page-4' },
		],
		'Data': [
			{ text: 'SqlServer', link: 'en/page-4' },
			{ text: 'Postgres', link: 'en/page-4' },
			{ text: 'MySql', link: 'en/page-4' },
			{ text: 'Json', link: 'en/page-4' },
		],
		'Api': [
			{ text: 'Rest/OData', link: 'en/page-4' },
			{ text: 'GraphQL', link: 'en/page-4' },
			{ text: 'gRPC', link: 'en/page-4' },
		],
	},
};
