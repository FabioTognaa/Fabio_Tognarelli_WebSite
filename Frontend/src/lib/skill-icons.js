const ICON_LOADERS = {
  html: () => import("../assets/icons/skills/html-icon.svg"),
  css: () => import("../assets/icons/skills/css-icon.svg"),
  javascript: () => import("../assets/icons/skills/javascript-icon.svg"),
  react: () => import("../assets/icons/skills/react-icon.svg"),
  tailwind: () => import("../assets/icons/skills/tailwind-icon.svg"),
  nodejs: () => import("../assets/icons/skills/nodejs-icon.svg"),
  python: () => import("../assets/icons/skills/python-icon.svg"),
  java: () => import("../assets/icons/skills/java-icon.svg"),
  c: () => import("../assets/icons/skills/c-icon.svg"),
  cpp: () => import("../assets/icons/skills/cpp-icon.svg"),
  fastapi: () => import("../assets/icons/skills/fastapi-icon.png"),
  postgresql: () => import("../assets/icons/skills/postgresql-icon.png"),
  docker: () => import("../assets/icons/skills/docker-icon.png"),
  githubactions: () => import("../assets/icons/skills/githubactions-icon.png"),
  claudecode: () => import("../assets/icons/skills/claudecode-icon.png"),
  cursor: () => import("../assets/icons/skills/cursor-icon.png"),
  n8n: () => import("../assets/icons/skills/n8n-icon.png"),
};

const iconCache = new Map();
const iconRequests = new Map();

export function loadSkillIcon(key) {
  if (!key || !ICON_LOADERS[key]) {
    return Promise.resolve(null);
  }

  if (iconCache.has(key)) {
    return Promise.resolve(iconCache.get(key));
  }

  if (!iconRequests.has(key)) {
    iconRequests.set(
      key,
      ICON_LOADERS[key]()
        .then((mod) => {
          const src = mod.default;
          iconCache.set(key, src);
          return src;
        })
        .catch(() => null)
        .finally(() => {
          iconRequests.delete(key);
        }),
    );
  }

  return iconRequests.get(key);
}
