function getJsonFromUrl(url) {
    if(!url) url = location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

window.MathJax = {
    tex: {
        inlineMath: [["$", "$"]]
    }
};

window.onload = async function() {
    var to_fetch;
    if (!this.location.search) {
        to_fetch = "md/index.md" // Default to index
    } else {
        // ?p=markdown_filename
        var q = (this.getJsonFromUrl(location.search)).p;
        to_fetch = "md/".concat(q, ".md")
        this.console.log(to_fetch);
    }
    sdConverter = new showdown.Converter({tables: true}),
    fetch(to_fetch).then(x => x.text()).then((txt)=>{
        document.getElementById("content").innerHTML = sdConverter.makeHtml(txt);
    })        
}