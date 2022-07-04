import React from "react";

import logo from "../Images/logo.png";
import userIcon from "../Images/user-icon.svg";
import filterIcon from "../Images/filter-icon.svg";
import editIcon from "../Images/edit-icon.svg";
import okIcon from "../Images/ok-icon.svg";
import deleteIcon from "../Images/delete-icon.svg";
import plusIcon from "../Images/plus-icon.svg";
import minusIcon from "../Images/minus-icon.svg";

export const Logo = () => (
    <img src={logo} alt="Personal Budget" width="124px" />
);

export const UserIcon = () => (
    <img src={userIcon} alt="User" width="24px" className="mx-1" />
);

export const FilterIcon = () => (
    <img src={filterIcon} alt="Filter" width="24px" className="mx-1" />
);

export const EditIcon = () => (
    <img src={editIcon} alt="Edit" width="24px" className="mx-1" />
);

export const OkIcon = () => (
    <img src={okIcon} alt="Ok" width="24px" className="mx-1" />
);

export const DeleteIcon = () => (
    <img src={deleteIcon} alt="Delete" width="24px" className="mx-1" />
);

export const PlusIcon = () => (
    <img src={plusIcon} alt="Plus" width="24px" className="mx-1" />
);

export const MinusIcon = () => (
    <img src={minusIcon} alt="Minus" width="24px" className="mx-1" />
);
