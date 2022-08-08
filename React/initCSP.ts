import { BACKEND_URL } from "./configuration";

const ADDITIONAL_URLS =
  "https://ipv4.icanhazip.com/ https://api.ipify.org/ https://cdnjs.cloudflare.com/";

const initContentSecurityPolicy = (cloudfrontUrl = "") => {
  const meta = document.createElement("meta");
  meta.httpEquiv = "Content-Security-Policy";
  meta.content = `
      default-src ${BACKEND_URL} ws: wss:  ${ADDITIONAL_URLS} ${cloudfrontUrl} 'self' 'unsafe-inline' blob:;
      connect-src ${BACKEND_URL} ws: wss: ${ADDITIONAL_URLS} ${cloudfrontUrl} 'self' 'unsafe-inline' blob:;
      img-src ${cloudfrontUrl} ${BACKEND_URL} 'self' data: blob:; 
      style-src 'unsafe-inline';
      worker-src blob: 'self';
      child-src blob:;
    `;
  document.getElementsByTagName("head")[0].appendChild(meta);
};

export default initContentSecurityPolicy;
