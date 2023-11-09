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
			{ text: 'Build a Nox Solution', link: 'en/nox-lib-quick-start-project' },
			{ text: 'Exploring the API', link: 'en/nox-lib-exploring-the-api' },
		],
		'Nox Features': [
			{ text: 'Domain Aggregation', link: 'en/nox-features-domain-aggregation' },
			{ text: 'Environment Variables', link: 'en/nox-features-environment-variables' },
			{ text: 'Optimistic Concurrency', link: 'en/nox-features-optimistic-concurrency' },
			{ text: 'Entity Auditing', link: 'en/nox-features-entity-auditing' },
			{ text: 'Nox Events', link: 'en/nox-features-events' },
			{ text: 'Logging', link: 'en/nox-features-logging' },
		],
		'Extending Nox': [
			/*
			{ text: 'Customise Nox', link: 'en/nox-lib-extending-overview' },
			*/
			{ text: 'The Nox Generator', link: 'en/nox-generator-overview' },
			{ text: 'API Endpoints', link: 'en/nox-lib-custom-endpoints' },
			{ text: 'DTOs', link: 'en/nox-lib-custom-dtos' },
			{ text: 'Queries', link: 'en/nox-lib-custom-queries' },
			{ text: 'Commands', link: 'en/nox-lib-custom-commands' },
			/*
			{ text: 'Overview', link: 'en/nox-lib-sample-project-overview' },
			{ text: 'The Design Folder', link: 'en/nox-lib-design-folder' },
			{ text: 'Database Migrations', link: 'en/nox-lib-sample-db-migrations' },
			{ text: 'Adding Entities', link: 'en/nox-lib-sample-entities' },
			{ text: 'Seeding Data', link: 'en/nox-lib-sample-seed-data' },
			{ text: 'Getting to know Nox jobs', link: 'en/nox-lib-sample-jobs' },
			{ text: 'Messaging Providers', link: 'en/nox-lib-sample-messaging' },
			{ text: 'Additional data types', link: 'en/nox-lib-sample-seed-exchange-rates' },
			{ text: 'Adding your own code', link: 'en/nox-lib-sample-custom-controller' },
			*/
		],
		'Nox.Cli': [
			{ text: 'About', link: 'en/nox-cli-about' },
			{ text: 'Installation', link: 'en/nox-cli-installation' },
			{ text: 'Sample Project', link: 'en/nox-cli-sample-project' },
			{ text: 'Manifest file', link: 'en/nox-cli-manifest-file' },
		],
		/*
		'Tools & Helpers': [
			{ text: 'Nox.Cli', link: 'en/tools-nox-cli-full-page' },
			{ text: 'Nox.Reference', link: 'en/tools-nox-reference-about' },
			{ text: 'Nox.Types', link: 'en/tools-nox-types' }
		]
		*/
	},
};


