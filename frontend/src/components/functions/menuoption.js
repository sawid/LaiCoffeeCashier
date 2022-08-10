import axios from "axios";

export const listMenuOption = async () => {
        return await axios.get(process.env.REACT_APP_API + "/listMenuOption", {
        });
};

export const listMenuOptionChoice = async () => {
        return await axios.get(process.env.REACT_APP_API + "/listMenuOptionPrice", {
        });
};