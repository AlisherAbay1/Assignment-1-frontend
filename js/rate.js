const taskFlowStars = document.querySelectorAll("#taskflow-rating span.star i");
const shopEaseStars = document.querySelectorAll("#shopease-rating span.star i");
const fitTrackStars = document.querySelectorAll("#fittrack-rating span.star i");

const ProjectsRatings = [taskFlowStars, shopEaseStars, fitTrackStars];

function fillStars(stars, selectedStar) {
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
}

function saveRating(selectedStar) {
    const ratingBlock = selectedStar.closest(".rating");
    const value = Number(selectedStar.closest(".star").dataset.value);

    localStorage.setItem(ratingBlock.id, value);
}

function restoreRating(stars) {
    if (stars.length === 0) {
        return;
    }
    const ratingBlock = stars[0].closest(".rating");
    const storageKey = ratingBlock.id.replace("profile-", "");
    const savedValue = Number(localStorage.getItem(storageKey));

    const savedStar = Array.from(stars).find(function (star) {
        return Number(star.closest(".star").dataset.value) === savedValue;
    });

    if (savedStar) {
        fillStars(stars, savedStar);
    }
}

function handleStarClick(stars, selectedStar) {
    fillStars(stars, selectedStar);
    saveRating(selectedStar);
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

for (const stars of ProjectsRatings) {
    bindStarEvents(stars);
}

const profileTaskFlowStars = document.querySelectorAll("#profile-taskflow-rating span.star i");
const profileShopEaseStars = document.querySelectorAll("#profile-shopease-rating span.star i");
const profileFitTrackStars = document.querySelectorAll("#profile-fittrack-rating span.star i");

const AllRatings = [taskFlowStars, shopEaseStars, fitTrackStars, 
                   profileTaskFlowStars, profileShopEaseStars, profileFitTrackStars];

for (const stars of AllRatings) {
    restoreRating(stars);
}