const modalBox = document.getElementById("modalBox");

function createModal() {
    console.log("Modal");
    const formData = new FormData();
    formData.append('action', 'getModalData');

    fetch('modal.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(json => {
            let modalContent = '<div id="modal">';

            Object.entries(json).forEach(([key, value]) => {
                modalContent += `<div class="column">`;
                modalContent += `<h3>${key}</h3>`;

                value.forEach((item, index) => {
                    const user = item.username ?? "-";
                    const score = item.score ?? "-";
                    modalContent += `<p>${index + 1}. <b>user:</b>${user} <br><b>score:</b> ${score} pts</p>`;
                });

                for (let i = value.length; i < 5; i++) {
                    modalContent += `<p>${i + 1} <b>user:</b>--<br><b>score:</b>--</p>`;
                }

                modalContent += `</div>`;
            });

            modalContent += '</div>';

            modalBox.insertAdjacentHTML('beforeend', modalContent);


            modalBox.addEventListener("mouseleave", deleteModal);

            console.log(json);
            console.log(json.medium);
            console.log(json.hard);
        })
        .catch(err => console.error(err));
}

function deleteModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.remove();
}

// spustí se při najetí
modalBox.addEventListener("mouseenter", createModal);
