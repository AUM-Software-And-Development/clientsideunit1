function ConvertToPlainEnglish(path) {
    let name = path;
    name = name.split("/").pop();
    name = name.replaceAll("%20", " ");
    name = name.replaceAll(".html", "");
    return name;
}
