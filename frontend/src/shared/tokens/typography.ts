export const typography = {
  family: {
    sans: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  size: {
    micro: "10px",
    tiny: "11px",
    caption: "12px",
    body: "13px",
    chat: "13.5px",
    button: "15px",
    title: "21px",
    display: "46px",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const typeClass = {
  micro: "text-[10px]",
  tiny: "text-[11px]",
  caption: "text-xs",
  body: "text-[13px]",
  chat: "text-[13.5px] leading-[1.6]",
  button: "text-[15px] font-bold",
  label: "text-[13px] font-bold",
  metricValue: "text-lg font-bold",
  display: "text-[46px] font-extrabold leading-none",
} as const;

