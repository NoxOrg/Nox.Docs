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
			{ text: 'How does it work?', link: 'en/how-it-works' },
			{ text: 'Let\'s get started', link: 'en/getting-started'},
		],
		'Nox.Lib': [
			{ text: 'About', link: 'en/nox-lib-about' },
			{ text: 'Sample Project', link: 'en/nox-lib-sample-project' },
			{ text: 'Exploring the API', link: 'en/nox-lib-exploring-the-api' },
		],
		'Nox.Cli': [
			{ text: 'About', link: 'en/nox-cli-about' },
			{ text: 'Installation', link: 'en/nox-cli-installation' },
			{ text: 'Sample Project', link: 'en/nox-cli-sample-project' },
			{ text: 'Manifest File', link: 'en/nox-cli-manifest-file' },
		]
	},
};


