const taskFlowStars = document.querySelectorAll("#taskflow-rating span.star i");
const shopEaseStars = document.querySelectorAll("#shopease-rating span.star i");
const fitTrackStars = document.querySelectorAll("#fittrack-rating span.star i");

const allRatings = [taskFlowStars, shopEaseStars, fitTrackStars];

function handleStarClick(stars, selectedStar) {
    let reached = false;

    for (const star of stars) {
        if (!reached) {
            star.classList.replace('bi-star', 'bi-star-fill');
        } else {
            star.classList.replace('bi-star-fill', 'bi-star');
        }

        if (star === selectedStar) {
            reached = true;
        }
    }

    showRatingNotification();
}

function showRatingNotification() {
    $("#rating-notification").css("display", "flex").hide().fadeIn(500);

    setTimeout(hideRatingNotification, 3000);
}

function hideRatingNotification() {
    $("#rating-notification").fadeOut(500);
}

function bindStarEvents(stars) {
    for (const star of stars) {
        star.addEventListener('click', () => handleStarClick(stars, star));
    }
}

for (const stars of allRatings) {
    bindStarEvents(stars);
}