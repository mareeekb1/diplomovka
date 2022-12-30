import { List, ListItem, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { Link } from "react-router-dom";

const dummyComunity = [
  {
    _id: Math.floor(Math.random() * 100),
    name: "Doctors",
    category: "Medicine",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Pilots",
    category: "Army",
    users: [0, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Teacher",
    category: "School",
    users: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Professors",
    category: "school",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Lawyers",
    category: "Law",
    users: [0, 1, 2, 5, 5, 5, 5, 5, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Nurses",
    category: "Medicine",
    users: [0, 1, 1, 1, 1, 1, 1, 1, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Programmers",
    category: "IT",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Doctors",
    category: "Medicine",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Pilots",
    category: "Army",
    users: [0, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Teacher",
    category: "School",
    users: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Professors",
    category: "school",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Lawyers",
    category: "Law",
    users: [0, 1, 2, 5, 5, 5, 5, 5, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Nurses",
    category: "Medicine",
    users: [0, 1, 1, 1, 1, 1, 1, 1, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Programmers",
    category: "IT",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Doctors",
    category: "Medicine",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Pilots",
    category: "Army",
    users: [0, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Teacher",
    category: "School",
    users: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Professors",
    category: "school",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Lawyers",
    category: "Law",
    users: [0, 1, 2, 5, 5, 5, 5, 5, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Nurses",
    category: "Medicine",
    users: [0, 1, 1, 1, 1, 1, 1, 1, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Programmers",
    category: "IT",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Doctors",
    category: "Medicine",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Pilots",
    category: "Army",
    users: [0, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Teacher",
    category: "School",
    users: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Professors",
    category: "school",
    users: [0, 1, 2, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Lawyers",
    category: "Law",
    users: [0, 1, 2, 5, 5, 5, 5, 5, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Nurses",
    category: "Medicine",
    users: [0, 1, 1, 1, 1, 1, 1, 1, 1, 3],
  },
  {
    _id: Math.floor(Math.random() * 100),
    name: "Programmers",
    category: "IT",
    users: [0, 1, 2, 3],
  },
];

const CommunityList = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.mediumMain;
  const darkHover = palette.primary.dark;

  return (
    <WidgetWrapper maxHeight="80vh" overflow="auto">
      <Typography color={dark} variant="h4" fontWeight="500">
        Your communities
      </Typography>
      <List>
        {dummyComunity.map(({ name, category, users, _id }, key) => (
          <Link to={"/community/" + _id} key={key}>
            <ListItem>
              <FlexBetween
                p="0.5rem 0.75rem"
                sx={{
                  width: "100%",
                  "&:hover": {
                    background: darkHover,
                    transition: "0.5s background",
                    borderRadius: "0.75rem",
                  },
                }}
              >
                <Typography color={main}>{name}</Typography>
                <FlexBetween width={"120px"}>
                  <Typography color={medium}>{category}</Typography>
                  <Typography color={main}>{users.length}</Typography>
                </FlexBetween>
              </FlexBetween>
            </ListItem>
          </Link>
        ))}
      </List>
    </WidgetWrapper>
  );
};

export default CommunityList;
