import { useRouter } from "next/router";

const Logo = () => <img width="45" src="/tonmask-logo.svg" />;

const Title = ({ children }) => {
  return <h4 className="mb-2 font-bold uppercase">{children}</h4>;
};

const Link = ({ children, href, target }) => (
  <div>
    <a href={href} target={target} rel="noopener">
      {children}
    </a>
  </div>
);

const TITLE_WITH_TRANSLATIONS = {
  "en-US": "A TON Wallet in your Browser",
};

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  "en-US": "Question? Give us feedback →",
};

export default {
  projectLink: "https://github.com/OpenProduct/openmask-extension",
  docsRepositoryBase: "https://github.com/OpenProduct/openmask-docs",
  titleSuffix: " – OpenMask",
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  feedbackLink: () => {
    return FEEDBACK_LINK_WITH_TRANSLATIONS["en-US"];
  },
  feedbackLabels: "feedback",
  logo: () => {
    const { locale } = useRouter();
    return (
      <>
        <Logo />
        <span
          className="mx-4 font-extrabold hidden md:inline select-none"
          title={"OpenMask: " + (TITLE_WITH_TRANSLATIONS[locale] || "")}
        >
          OpenMask
        </span>
      </>
    );
  },
  head: ({ title, meta }) => {
    const { route } = useRouter();

    return (
      <>
        {/* Favicons, meta */}
        <link rel="icon" href="/tonmask-logo.svg" type="image/svg+xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description ||
            "A safe crypto web extension wallet for The Open Network. Join the blockchain and DeFi world."
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            "A safe crypto web extension wallet for The Open Network. Join the blockchain and DeFi world."
          }
        />
        <meta
          name="og:title"
          content={
            title
              ? title + " – OpenMask"
              : "OpenMask: A TON Wallet in your Browser"
          }
        />
        <meta name="apple-mobile-web-app-title" content="OpenMask" />
      </>
    );
  },
  footerEditLink: ({ locale }) => {
    switch (locale) {
      default:
        return "Edit this page on GitHub →";
    }
  },
  footerText: ({ locale }) => {
    switch (locale) {
      default:
        return (
          <div>
            <div className="flex w-full flex-col md:flex-row md:justify-between gap-4">
              <div>
                <Title>Learn more</Title>
                <Link href="/blog">Blog</Link>
                <Link href="/docs/introduction">Documentation</Link>
              </div>
              <div>
                <Title>Get involved</Title>
                <Link
                  href="https://github.com/OpenProduct/openmask-extension"
                  target="_blank"
                >
                  GitHub
                </Link>
              </div>
              <div>
                <Title>Connect</Title>
                <Link href="https://t.me/openproduct" target="_blank">
                  Telegram
                </Link>
              </div>
              <div>
                <Title>Legal</Title>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </div>
            </div>
            <div className="mt-4 text-xs">
              @2022 OpenMask
              <a
                href="https://ton.org"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center no-underline text-current"
              >
                <span className="ml-4">Powered by TON</span>
              </a>
            </div>
          </div>
        );
    }
  },
  i18n: [{ locale: "en-US", text: "English" }],
};
