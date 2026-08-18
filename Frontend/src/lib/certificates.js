import { certificateFiles } from "./static-assets";

export const certificates = [
  {
    id: "Anthropic",
    title: "Anthropic Academy",
    links: [
      {
        label: "Claude 101",
        href: certificateFiles.claude101,
      },
      {
        label: "Claude Code 101",
        href: certificateFiles.code101,
      },
      {
        label: "Cowork",
        href: certificateFiles.cowork,
      },
      {
        label: "Agents skills",
        href: certificateFiles.agentSkills,
      },
      {
        label: "Subagents",
        href: certificateFiles.subagents,
      },
    ],
  },
];
