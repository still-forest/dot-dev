export * from "./LokiTransport";

export const isMobileWebView = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  // React Native WebView
  if (userAgent.includes("wv") || userAgent.includes("webview")) {
    return true;
  }

  // iOS WebView indicators
  if (/(?:iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(userAgent)) {
    return true;
  }

  // Android WebView indicators
  if (userAgent.includes("android") && !userAgent.includes("chrome")) {
    return true;
  }

  // React Native specific
  if (userAgent.includes("reactnative")) {
    return true;
  }

  return false;
};
