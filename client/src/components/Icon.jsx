import { Castle, Cloud, Coffee, Computer, CorporateFare, DirectionsCar, DirectionsRun, ElectricBolt, Euro, Gavel, MedicalServices, Star } from "@mui/icons-material";
import React from "react";

export default function Icon({ name, ...props }) {
  switch (name) {
    case "computer":
      return <Computer {...props} />;
    case "gavel":
      return <Gavel {...props} />;
    case "medicalServices":
      return <MedicalServices {...props} />;
    case "star":
      return <Star {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "coffee":
      return <Coffee {...props} />;
    case "castle":
      return <Castle {...props} />;
    case "corporateFare":
      return <CorporateFare {...props} />;
    case "directionsRun":
      return <DirectionsRun {...props} />;
    case "directionsCar":
      return <DirectionsCar {...props} />;
    case "electricBolt":
      return <ElectricBolt {...props} />;
    case "euro":
      return <Euro {...props} />;
    default:
      return <div />;
  }
}
export const iconValues = [
  "computer",
  "gavel",
  "medicalServices",
  "star",
  "cloud",
  "coffee",
  "castle",
  "corporateFare",
  "directionsRun",
  "directionsCar",
  "electricBolt",
  "euro"
];

