import React from "react";
import CustomWebDesign from "./CustomWebDesign/CustomWebDesign";
import NewFaqSuggestion from "./NewFaqSuggestion/NewFaqSuggestion";

const FormsFactory = ({ form }) => {
    console.log(form);
    const returnForm = () => {
        if (form === "CustomWebDesign") {
            return <CustomWebDesign />;
        } else if (form === "NewFaqSuggestion") {
            return <NewFaqSuggestion />;
        } else {
            return null;
        }
    }

    return (
        <>
            {returnForm()}
        </>
    )
}

export default FormsFactory;