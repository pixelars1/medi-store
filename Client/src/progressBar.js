import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Customize style
NProgress.configure({ showSpinner: false, speed: 400, easing: "ease" });

export const startProgress = () => NProgress.start();
export const stopProgress = () => NProgress.done();
