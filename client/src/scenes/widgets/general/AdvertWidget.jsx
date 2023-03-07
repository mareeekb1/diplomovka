import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper mb={1}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="/assets/lenovo.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Lenovo</Typography>
        <Typography color={medium}>
          <a
            href="https://www.lenovo.com"
            style={{ color: medium }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.lenovo.com
          </a>
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Lenovo is now the world's leading PC manufacturer, narrowly ahead of HP.
        It became the global #1 for the first time in 2013, and has jostled its
        US rival for the top spot on and off since then.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
