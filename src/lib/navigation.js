import { CV_PATH } from "./projects";

export const siteNav = [
  { label: "Chi sono", href: "/#about", type: "anchor" },
  { label: "Percorso", href: "/#percorso", type: "anchor" },
  { label: "Competenze", href: "/#competenze", type: "anchor" },
  { label: "Progetti", href: "/projects", type: "route" },
  { label: "Contatto", href: "/contact", type: "route" },
];

export const headerCta = {
  label: "Scarica CV",
  href: CV_PATH,
  type: "download",
};

export const socialLinks = [
  {
    href: "https://www.linkedin.com/in/fabio-tognarelli",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/FabioTognaa",
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/fabiotognarellii",
    label: "Instagram",
  },
];
