module.exports = {
  title: "FoloToy Docs",
  tagline: "A self-hosting server for your FoloToy",
  url: "https://docs.folotoy.com",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "folotoy",
  projectName: "folotoy-server-self-hosting",
  themeConfig: {
    navbar: {
      title: "FoloToy Docs",
      logo: {
        alt: "FoloyToy Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/installation/docker",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        // { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/FoloToy/folotoy-server-self-hosting",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    // footer: {
    //   style: "dark",
    //   items: [
    //     {
    //       title: "Community",
    //       items: [
    //         {
    //           label: "Discord",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} FoloToy.com`,
    // },
    prism: {
      additionalLanguages: ["apacheconf", "sql"],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // routeBasePath: "", // Docs-only
          sidebarCollapsible: false,
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/FoloToy/folotoy-server-self-hostinge/edit/main/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
