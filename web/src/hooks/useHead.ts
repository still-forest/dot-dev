import { useCallback, useEffect, useState } from "react";

interface UseHeadOptions {
  baseTitle: string;
  separator?: string;
  preserveTitleOnUnmount?: boolean;
}

export const useHead = (options: UseHeadOptions) => {
  const { baseTitle, separator = " - ", preserveTitleOnUnmount = false } = options;

  const [title, setTitle] = useState<string[] | string | null>(null);

  useEffect(() => {
    if (!title) {
      document.title = baseTitle;
      return;
    }

    const titleParts = Array.isArray(title) ? [...title] : [title];
    document.title = `${titleParts.reverse().join(separator)} | ${baseTitle}`;

    return () => {
      if (!preserveTitleOnUnmount) {
        document.title = baseTitle;
      }
    };
  }, [title, baseTitle, separator, preserveTitleOnUnmount]);

  const resetTitle = useCallback(() => {
    setTitle(null);
  }, []);

  const setIcon = useCallback((path: string) => {
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.href = path;
  }, []);

  const setMetaDescription = useCallback((description: string) => {
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;
  }, []);

  return { setTitle, resetTitle, setIcon, setMetaDescription };
};
