// 参考: https://panda-program.com/posts/nextjs-google-analytics
export const GA_ID = "UA-51886701-2";

// PVを測定する
export const pageview = (path) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label, value = "" }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
