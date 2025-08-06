const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};

const addCards = (items) => {
    items.forEach(item => {
        let cardHTML = `
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image">
                    <img src="${item.image}">
                    <span class="card-title">${item.title}</span>
                </div>
                <div class="card-content">
                    <p>${item.description}</p>
                </div>
                <div class="card-action">
                    <a href="#">${item.link}</a>
                </div>
            </div>
        </div>`;
        $("#card-section").append(cardHTML);
    });
};

$(document).ready(function(){
    console.log('[SIT-725] - DOM is ready');

    $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        console.log('[SIT-725] - The button is clicked');
        clickMe();
    });

    // Fetch project data from backend
    $.get('/api/projects', (response) => {
        if(response.statusCode === 200) {
            console.log('Projects loaded:', response.data);
            addCards(response.data);
        } else {
            console.error('Failed to load projects');
        }
    });
});

