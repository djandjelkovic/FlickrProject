//datum
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}
today = mm + '/' + dd + '/' + yyyy;
document.getElementById("date-block").innerHTML = today;
//kraj datuma
var pagesTotal;
var pageNumber = 1
document.getElementById("pageNumber").innerHTML = pageNumber;

// site that doesn’t send Access-Control
const proxyurl = "https://cors-anywhere.herokuapp.com/";


document.getElementById("button").addEventListener("click", function () {

    if (document.getElementById("find1").value.trim() != "") {

        var searchTerm = document.getElementById("find1").value;
        // koristio sam flickr search photo api za pretragu slika i prikazivanje!
        //dinamički izrađujem url koji mi je potreban tako što prosleđujem seachTearm i pageNumber..
        //api key dobio sam za autentifikaciju preko yahoo accounta, ulogovao sam se.
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=04473208e3848503ccf004271fdd0512&per_page=30&tags=" + searchTerm + "&tag_mode=all&page=" + pageNumber + "&extras=date_taken,tags&format=json&nojsoncallback=1"; //extras - dodatne vrednosti koje želim da mi api vrati

        fetch(proxyurl + url)
            .then(response = > response.json()
    )
    .
        then(json = > {

            pagesTotal = json.photos.pages;
        //document.getElementById("pageNumberLast").innerHTML = pagesTotal;

        document.getElementById("mainBlock").innerHTML = "";

        for (var i = 0; i < json.photos.photo.length; i++) {

            var linkTag = document.createElement("A")
            var imgTag = document.createElement("IMG")
            linkTag.href = "https://farm" + json.photos.photo[i].farm + ".staticflickr.com/" + json.photos.photo[i].server + "/" + json.photos.photo[i].id + "_" + json.photos.photo[i].secret + "_z.jpg";
            linkTag.target = "_blank"
            imgTag.src = "https://farm" + json.photos.photo[i].farm + ".staticflickr.com/" + json.photos.photo[i].server + "/" + json.photos.photo[i].id + "_" + json.photos.photo[i].secret + "_q.jpg";
            imgTag.style.width = 200 + "px"
            imgTag.style.height = 200 + "px"


            linkTag.className = "block-50  right padd-0 item"
            var block = document.createElement("DIV");
            block.className = "block-50 border item"
            block.style.color = "black"
            block.style.border = "solid black 2px" // AKO NECU DEBELI BORDER OKOLO...

            //tagovi
            var blockTags = document.createElement("DIV");
            blockTags.className = "block-50 item"
            //blockTags.style.backgroundImage="url(img/papir.jpg)"
            // blockTags.style.borderRadius=20+"px"
            var tagsString = "#" + json.photos.photo[i].tags.replace(/ /g, " #")
            var tags = document.createElement("H5");
            tags.innerHTML = "Tags: " + tagsString
            tags.style.color = "gray"


            blockTags.appendChild(tags)


            //dateTaken
            var blockDateTaken = document.createElement("DIV");
            blockDateTaken.className = "block-50  item"

            var dateTaken = document.createElement("H5")
            dateTaken.innerHTML = "Date taken: " + new Date(Date.parse(json.photos.photo[i].datetaken)).toLocaleString()
            dateTaken.style.color = "black"


            blockDateTaken.appendChild(dateTaken)


            block.appendChild(blockDateTaken)
            block.appendChild(linkTag)
            linkTag.appendChild(imgTag)
            block.appendChild(blockTags)
            document.getElementById("mainBlock").appendChild(block)
        }

        if (document.getElementById("mainBlock").innerHTML == "") {
            document.getElementById("navigation").style.display = "none"
        } else {
            document.getElementById("navigation").style.display = "block"
        }

        document.getElementById("pageNumber").innerHTML = pageNumber;


    })

    .
        catch(() = > console.log("Can’t access " + url + " response. Blocked by browser?")
    )


    }
})

document.getElementById("nextPage").addEventListener("click", function () {
    if (document.getElementById("find1").value.trim() != "" && pageNumber < pagesTotal) {
        pageNumber++
        document.getElementById('button').click();
    }

})

document.getElementById("previousPage").addEventListener("click", function () {
    if (document.getElementById("find1").value.trim() != "" && pageNumber > 1) {
        pageNumber--
        document.getElementById('button').click();
    }

})
