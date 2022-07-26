import axios from "axios";

export const listMenu = async () => {
        return await axios.get(process.env.REACT_APP_API + "/listMenu", {
        });
};