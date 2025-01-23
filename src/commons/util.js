import moment from "moment";
import titleize from "titleize";
const { DateTime } = require("luxon");
var dateFormatter = require("dateformat");

const util = {};

util.titleCase = input => {
    if (input === null || input === undefined) return "";
    if (typeof input !== "string") return input;
    return titleize(input);
};


util.findByKey = async (arr, key) => {
    return await arr.find(item => {
        return item.key === key;
    });
};
util.mergeArr = (template, arr) => {
    let result = template.map(x =>
        Object.assign(x, arr.find(y => y.key === x.key))
    );
    return result;
};
util.sortArr = (arr, key) => {
    return arr.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]));
};

util.chunkArray = (chunk_size, arr) => {
    return arr
        .map(function (e, i) {
            return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
        })
        .filter(function (e) {
            return e;
        });
};

util.toISODateFormat = (input, dateFormat) => {
    if (!input) return ""
    if (!dateFormat) dateFormat = "DD-MM-YYYY";
    return DateTime.fromISO(input, { zone: "UTC" }).toFormat(dateFormat);
};

util.toDateFormat = (input, dateFormat) => {
    if (!input) return "";
    if (!dateFormat) dateFormat = "DD-MM-YYYY";
    return moment(new Date(input)).format(dateFormat);
};
util.toDateFormatTZ1 = (input, dateFormat) => {
    if (!input) return ""
    if (!dateFormat) dateFormat = "DD-MM-YYYY";
    return DateTime.fromISO(input, { zone: "UTC" }).toFormat( "dd MMM yyyy HH:mm" );

}
util.toDateFormatTZ = (input, dateFormat) => {
    if (!input) return ""
    if (!dateFormat) dateFormat = "DD-MM-YYYY";
    return DateTime.fromISO(input, { zone: "UTC" }).toFormat(dateFormat);

};


util.compareDateTime = (inputDate2, inputDate1) => {
    let dateFormat = "DD/MM/YYYY HH:mm";
    let i1;
    if (!inputDate1) {
        inputDate1 = i1 = moment(new Date()).format(dateFormat)
    }


    let i2 = util.toDateFormat(inputDate2, "DD/MM/YYYY HH:mm");
    var isafter = moment(i1, dateFormat).isAfter(moment(i2, dateFormat));
    return isafter
}

util.isBeforeDate = (inputDate1, inputDate2) => {
    return moment(new Date(inputDate2)).isBefore(moment(new Date(inputDate1)));
}
util.isPastDate = (inputDate) => {
    let curDate = new Date();
    return moment(new Date(inputDate)).isBefore(moment(curDate));

}
util.formatForm = (inputForm) => {
    let mergedArr = [];
    inputForm.forEach(value => {
        mergedArr.push({ ...value });
    });
    return mergedArr;
}
export default util;
