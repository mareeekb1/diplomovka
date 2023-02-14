import { Computer, Gavel, MedicalServices } from "@mui/icons-material";
import React from "react";

export const iconValues = ["computer", "gavel", "medicalServices"];
export default function Icon({ name, ...props }) {
  switch (name) {
    case "computer":
      return <Computer {...props} />;
    case "gavel":
      return <Gavel {...props} />;
    case "medicalServices":
      return <MedicalServices {...props} />;
    default:
      return <div />;
  }
}
