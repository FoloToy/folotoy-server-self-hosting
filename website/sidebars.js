module.exports = {
  docs: [
    {
      type: "category",
      label: "Getting started",
      items: [
        {
          type: "category",
          label: "Installation",
          items: [
            "installation/docker",
            "installation/docker-mosquitto",
            "installation/synology-nas",
            "installation/flyio",
            "installation/windows-wsl2",
          ],
        },
        "faq",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: ["guides/nginx", "guides/1panel"],
    },
    {
      type: "category",
      label: "Integrations",
      items: [
        "integrations/mqtt",
      ],
    },
    {
      type: "category",
      label: "Advanced Configuration",
      items: ["configuration/environment_variables"],
    },
    {
      type: "category",
      label: "Maintenance",
      items: [
        "upgrading",
      ],
    },
    {
      type: "doc",
      id: "development",
    },
  ],
};
