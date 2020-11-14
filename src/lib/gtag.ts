// 参考: https://panda-program.com/posts/nextjs-google-analytics
export const GA_ID = "UA-51886701-2";

// PVを測定する
export const pageview = (path: string): void => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

type Event = {
  action: string;
  category: string;
  label: string;
  value: string;
};

// GAイベントを発火させる
export const event = ({ action, category, label, value = "" }: Event): void => {
  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
