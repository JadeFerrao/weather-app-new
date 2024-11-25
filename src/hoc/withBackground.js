import React from "react";

const withBackgroundColor = (NewComponent, color) => {
    return (props) => {
        const style = {
        backgroundColor: color,
        padding: "20px",
        borderRadius: "5px",
    };

    return (
        <div style={style}>
        <NewComponent {...props} />
        </div>
    )
};
}
export default withBackgroundColor