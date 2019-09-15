var counter;

var contentArray;

if (contentType == "commercials") {
    contentArray = commercials;
} else if (contentType == "features") {
    contentArray = features;
}


$(document).ready(function() {

    // Populate the page with thumbnail cards of all the videos


    for (i in contentArray) {
        // console.log(item);

        var thumbnailCard = document.createElement("div");
        let thumbClasses = ['col-sm-12', 'col-md-6', 'col-lg-4', 'thumbnail-card', 'px-4'];

        thumbnailCard.classList.add(...thumbClasses);

        var card = document.createElement("div");
        let cardClasses = ['card', 'mb-4']
        card.classList.add(...cardClasses);
        card.id = i;

        var image = document.createElement("img");
        let imageClasses = ['bd-placeholder-img', 'card-img-top'];
        image.classList.add(...imageClasses);
        image.src = "img/video_thumbnails/" + contentArray[i].thumbnailUrl;
        image.alt = "thumbnail " + i;

        var cardBody = document.createElement("div");
        cardBodyClasses = ['card-body', 'p-0', 'py-1'];
        cardBody.classList.add(...cardBodyClasses);

        var paragraph = document.createElement("p");
        let parClasses = ['card-text', 'text-center', 'mb-2', 'mt-1'];
        paragraph.classList.add(...parClasses);
        paragraph.innerHTML = contentArray[i].title;


        cardBody.appendChild(paragraph);
        card.appendChild(image);
        card.appendChild(cardBody);
        thumbnailCard.appendChild(card);
        document.getElementById("video-gallery").appendChild(thumbnailCard);
        i++;
    }





    var $iframe = $("#iframe");
    var $projectSubtitle = $("#project-subtitle");
    var $projectTitle = $("#project-title");
    var $iframeContainer = $(".iframe-container");
    var $btnPrev = $("#btn-prev");
    var $btnNext = $("#btn-next");
    var $btnClose = $("#btn-close");


    // Update video player to contain information relevant to thumbnail clicked

    function updatePlayer() {

        // Replace vimeo link in iframe
        $iframe.attr("src", contentArray[counter].videoUrl);

        // Replace director name
        $projectSubtitle.html(contentArray[counter].subtitle);

        // Replace project title
        $projectTitle.html(contentArray[counter].title);

        // Update the padding of the player
        $iframeContainer.attr("padding", contentArray[counter].padding);

    }

    // Disable previous button or next button when at the edges of the contentArray array

    function updatePlayerButtons() {

        // If counter is set below or equal to zero
        if (counter == 0) {
            // Disable previous button
            $btnPrev.addClass('player-btn-disabled');

            // If the size of the content array is only 1
            if (contentArray.length == 1) {

                // Disable the next button as well
                $btnNext.addClass('player-btn-disabled');
            }
        }

        // If counter is equal to the size of contentArray array
        else if (counter == contentArray.length - 1) {
            $btnNext.addClass('player-btn-disabled');

        }
        // Enable all buttons
        else {
            $btnPrev.removeClass('player-btn-disabled');
            $btnNext.removeClass('player-btn-disabled');
        }
    }

    // Click on thumbnail
    $(".card").click(function() {

        counter = $(this).get(0).id;
        // console.log("Counter is " + counter);
        // console.log(contentArray[counter]);

        // Populate player with relevant information
        updatePlayer();

        // Update the display of the buttons
        updatePlayerButtons();

        // Fade in the gallery if not displayed
        if ($("#gallery-player-container").css('display') == "none") {
            $("#gallery-player-container").fadeIn(320);
        }

        // Jump to the top of the page
        $('html, body').animate({
            scrollTop: $("#gallery-player-container").offset().top - 20
        }, -200);

    });


    // Click on previous button
    $btnPrev.click(function() {
        if (counter <= 0) {
            counter = 0;
            //disable previous button
            $btnPrev.prop('disabled', true);

        } else {
            counter--;
            $btnNext.prop('disabled', false);
            updatePlayer();
        }

        updatePlayerButtons();

    });

    // Click on next button
    $btnNext.click(function() {
        if (counter >= contentArray.length - 1) {
            counter = contentArray.length - 1;
            $btnNext.prop('disabled', true);
        } else {
            counter++;
            $btnPrev.prop('disabled', false);
            updatePlayer();
        }

        updatePlayerButtons();
    });

    // Clicking on close button will close the video player
    $btnClose.click(function() {
        $("#gallery-player-container").fadeOut(320);

        // And remove the vimeo link so the video stops playing
        $iframe.attr("src", "");
    });


});