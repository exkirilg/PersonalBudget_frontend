import React from "react";

import logo from "../Images/logo.png";
import user from "../Images/user-icon.svg";
import filter from "../Images/filter-icon.svg";

export const Logo = () => (
    <img src={logo} alt="Personal Budget" width="124px" />
);

export const UserIcon = () => (
    <img src={user} alt="User" width="24px" className="mx-1" />
);

export const FilterIcon = () => (
    <img src={filter} alt="Filter" width="24px" className="mx-1" />
);
