/** URL pubblici serviti da Frontend/public/ (Vite publicDir). */

export const profileImage = {
  src: "/images/profile/tognarelli-800.webp",
  srcSet:
    "/images/profile/tognarelli-480.webp 480w, /images/profile/tognarelli-800.webp 800w, /images/profile/tognarelli-1200.webp 1200w",
  sizes: "(min-width: 640px) 28rem, min(100vw - 2.5rem, 22rem)",
  width: 800,
  height: 1000,
};

export const CV_PATH = "/documents/cv-tognarelli-fabio.pdf";
export const CV_FILENAME = "cv-tognarelli-fabio.pdf";

export const certificateFiles = {
  claude101: "/certificates/claude-101.pdf",
  code101: "/certificates/code-101.pdf",
  cowork: "/certificates/intro-cowork.pdf",
  agentSkills: "/certificates/intro-agents-skill.pdf",
  subagents: "/certificates/intro-subagents.pdf",
  aiForBusinesses: "/certificates/intro-ai-for-businesses.pdf",
};

export const educationLogos = {
  fermi: {
    src: "/images/logos/fermi-120.webp",
    srcSet:
      "/images/logos/fermi-120.webp 120w, /images/logos/fermi-240.webp 240w",
    sizes: "120px",
  },
  unipi: {
    src: "/images/logos/unipi-120.webp",
    srcSet:
      "/images/logos/unipi-120.webp 120w, /images/logos/unipi-240.webp 240w",
    sizes: "120px",
  },
  jevis: {
    src: "/images/logos/jevis-120.webp",
    srcSet:
      "/images/logos/jevis-120.webp 120w, /images/logos/jevis-240.webp 240w",
    sizes: "120px",
  },
};
