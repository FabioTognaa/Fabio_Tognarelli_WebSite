const ICON_LOADERS = {
  html: () => import("../assets/html-icon.svg"),
  css: () => import("../assets/css-icon.svg"),
  javascript: () => import("../assets/javascript-icon.svg"),
  react: () => import("../assets/react-icon.svg"),
  tailwind: () => import("../assets/tailwind-icon.svg"),
  nodejs: () => import("../assets/nodejs-icon.svg"),
  python: () => import("../assets/python-icon.svg"),
  java: () => import("../assets/java-icon.svg"),
  c: () => import("../assets/c-icon.svg"),
  cpp: () => import("../assets/cpp-icon.svg"),
  fastapi: () => import("../assets/fastapi-icon.png"),
  postgresql: () => import("../assets/postgresql-icon.png"),
  docker: () => import("../assets/docker-icon.png"),
  githubactions: () => import("../assets/githubactions-icon.png"),
  claudecode: () => import("../assets/claudecode-icon.png"),
  cursor: () => import("../assets/cursor-icon.png"),
  n8n: () => import("../assets/n8n-icon.png"),
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
