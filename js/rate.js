const taskFlowStars = document.querySelectorAll("#taskflow-rating span.star i");
const shopEaseStars = document.querySelectorAll("#shopease-rating span.star i");
const fitTrackStars = document.querySelectorAll("#fittrack-rating span.star i");

const allRatings = [taskFlowStars, shopEaseStars, fitTrackStars];


for (const stars of allRatings) {
    for (const star of stars) {
        star.addEventListener('click', () => {
            let reached = false;

            for (const s of stars) {
                if (!reached) {
                    s.classList.replace('bi-star', 'bi-star-fill');
                } else {
                    s.classList.replace('bi-star-fill', 'bi-star');
                }
                if (s === star) {
                    reached = true
                }
            }
        })
    }
}