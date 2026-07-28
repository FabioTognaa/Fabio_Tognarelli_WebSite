import { CV_PATH, CV_FILENAME } from "./projects";

export const siteNav = [
  { label: "Home", href: "/" },
  { label: "Chi sono", href: "/about" },
  { label: "Percorso", href: "/studies" },
  { label: "Competenze", href: "/skills" },
  { label: "Progetti", href: "/projects" },
  { label: "Contatto", href: "/contact" },
];

export const headerCta = {
  label: "Scarica CV",
  href: CV_PATH,
  download: CV_FILENAME,
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
