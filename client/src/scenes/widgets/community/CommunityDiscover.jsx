// import { useTheme } from "@mui/material";
// import { getRequest } from "api";
// import { api } from "api/routes";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const CommunityContainer = () => {
  //   const { palette } = useTheme();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await getRequest(routes.category.get, {});
  //     console.log(request);
  //   }
  //   fetchData();
  // }, []);
  return (
    <WidgetWrapper sx={{ height: "80vh", overflow: "auto" }}>
      tu budu vsetky komunity + filtrovanie na zaklade kategorii
    </WidgetWrapper>
  );
};

export default CommunityContainer;
