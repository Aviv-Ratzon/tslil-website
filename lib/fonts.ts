import localFont from "next/font/local";

export const yarden = localFont({
  src: [
    {
      path: "../assets/Fonts/yarden-alefalefalef/YardenAlefAlefAlef/web/yarden-regular-alefalefalef.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/Fonts/yarden-alefalefalef/YardenAlefAlefAlef/web/yarden-bold-alefalefalef.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-yarden",
  display: "swap",
});

export const rubik = localFont({
  src: [
    {
      path: "../assets/Fonts/Rubik/static/Rubik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/Fonts/Rubik/static/Rubik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/Fonts/Rubik/static/Rubik-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/Fonts/Rubik/static/Rubik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
  display: "swap",
});
