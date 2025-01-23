
import moment from "moment"

export let date_filters = [
    {
        key: "fromDateTime", displayName: "Start Date ", order: 1, type: "date",
        error: "", value: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
        required: true, defaultValue: moment(new Date()).startOf("month").format("YYYY-MM-DD")
    },
    {
        key: "toDateTime", displayName: "End Date ", order: 2, type: "date", error: "",
        value: moment(new Date()).endOf("month").format("YYYY-MM-DD"), defaultValue: moment(new Date()).endOf("month").format("YYYY-MM-DD"), required: true
    }
];


