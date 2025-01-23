const { appColors } = require("../constants/colors")
const tableOptions = {
    headerStyle: {
        //backgroundColor: "#EDF0F1",
        backgroundColor: "#a9cce3",
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        whiteSpace: "nowrap",
        height: 40
    },
    cellStyle: {
        fontSize: 14
    },
    padding: "dense",
    paging: true,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50],
    paginationType: "normal",
    actionsColumnIndex: -1,
    sorting: true
    // tableLayout: "fixed"
};

const titleCell = {
    fontWeight: "bold",
    fontSize: "14px",
    color: appColors.tableCellTitle
};

const posCell = {
    fontSize: "14px",
    color: "green ",
    fontWeight: "bold"
}

const negCell = {
    fontSize: "14px",
    color: "red ",
    fontWeight: "bold"
}
const negCell1 = {
    fontSize: "14px",
    color: "red",
    backgroundColor: "#ffb2b2",
    fontWeight: "bold",
    border: '1px red',
    padding: 15,
    margin: 15
}

const readyCell = {
    fontSize: "14px",
    color: "orange ",
    fontWeight: "bold"
};

const defaultCell = {
    fontSize: "14px",
    color: "blue ",
    fontWeight: "bold",
    height: '14px',
    borderRadius: 5
};

const customStyles = {
    errorBtn: {
        background: 'red',
        color: 'white'
    },
    successBtn: {
        background: 'green',
        color: 'white'
    }
}

export { tableOptions, titleCell, posCell, negCell, readyCell, defaultCell, negCell1, customStyles };