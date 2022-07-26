import axios from "axios";

export const listMenuSection = async () => {
        return await axios.get(process.env.REACT_APP_API + "/listMenuSection", {
        });
};