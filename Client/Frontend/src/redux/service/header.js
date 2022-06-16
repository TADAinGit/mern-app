const header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.data.accessToken) {
        return { Authorization: "Bearer " + user.data.accessToken };
    } else {
        return {};
    }
};

export default header;