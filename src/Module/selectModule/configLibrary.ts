export const accessLevelFilter = {
    name: "accessLevel",
    id: "accessLevelFilter",
    textId: "select.accessLevel",
    index: {
        "": 0,
        "0": 1,
    },
    option: [
        {textId: "select.option.all", value: ""},
        {textId: "select.option.nadi", value: "0"}
    ]
}

export const fileTypeFilter = {
    name: "fileType",
    id: "fileTypeFilter",
    textId: "select.fileType",
    index: {
        "": 0,
        "0": 1,
        "1": 2,
    },
    option: [
        {textId: "select.option.all", value: ""},
        {textId: "select.option.folder", value: "0"},
        {textId: "select.option.csv", value: "1"}
    ]
}