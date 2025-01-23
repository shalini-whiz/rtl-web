
let validateFormData = async (obj) => {
    obj.map(item => {
        if (item.value != undefined && item.value != null && item.type !== "number" && item.value.toString().length) {
            item.value = (typeof (item["value"]) == "string") ? item["value"].trim() : item["value"]
        }
        let value = item["value"];
        if (item.type === "number" && value && item.value.toString().length > 0)
            item.value = item.decimal ? parseFloat(value) : parseInt(value)
        item.error = ""
        if (item.required) {
            if (item.value == undefined || item.value.toString() === "NaN" || item.value.toString() === NaN ||
                (item.value != undefined && item.value.toString().length === 0)
            ) {
                item["error"] = item.displayName + " required";
            }
        }

        console.log(item.key+" ... "+item.required+" ... "+item.value+" ... "+item.error)
        let validValue = true;
        if (item.type === "number") {
            if (item.value === null || (value && item.value.toString() === NaN) || (value && item.value.toString() === "NaN"))
                validValue = false;
        }
        else if (item.type != "number" && (item.value == undefined || item.value == null ||
            (value && item.value.toString() == "NaN") || (value && item.value.toString() == NaN)))
            validValue = false;

        if (validValue) {
            if (item.regExp) {

                if (value != undefined && value.toString().length > 0) {
                    let status = item.regExp.test(value) ? true : false;
                    if (status) {
                            item["error"] = "";
                            if (item.validatorFunc) {
                                let validatorStatus = item.validatorFunc(value);
                                if (!validatorStatus)
                                    item["error"] = item.validatorMsg ? item.validatorMsg : "Invalid data";
                            }
                        } else
                            item["error"] = item.regExMessage;
                    }

            }
        }
    })
    return obj;
}


let formToObj = async obj => {
    let apiFormData = [...obj];
    let formData = {};
    apiFormData.map(item => {
        if (item.value !== undefined && item.value !== null) {
                let key = item["key"];
                let value = item["value"];
            formData[key] = value;
            if (item.type === "number" && value.length === 0)
                delete formData[key];
        }
    });
    return formData;
};

export { validateFormData, formToObj };
