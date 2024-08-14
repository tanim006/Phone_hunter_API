async function mainData(deviceName) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${deviceName}`);
    const ResData = await res.json();
    const mobile = ResData.data;
    displayData(mobile);
}

function displayData(phones) {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.textContent = '';

    const showButton = document.getElementById('showButton');
    if (phones.length > 12) {
        showButton.classList.remove('hidden');
    } else {
        showButton.classList.add('hidden');
    }

    phones = phones.slice(0, 12);
    phones.forEach(function (phone) {  // Changed from 'phones' to 'phone'
        console.log(phone);
        const div = document.createElement('div');
        div.classList = `card bg-base-100 w-96 shadow-xl`;
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                    <button onclick="detailsShow('${phone.slug}')" class="btn btn-primary">See Details</button>
                </div>
            </div>`;
        mainContainer.appendChild(div);
    });

    spinner(false);
}

async function detailsShow(id) {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);

    const finalData = data.data;
    console.log(finalData);
    modal(finalData);
}

function modal(phone) {
    const name = document.getElementById('PhoneName');
    name.innerText = phone.name;
    
    const mainModal = document.getElementById('mainModal'); // Make sure this element exists
    mainModal.showModal();
}

function spinner(isLoading) {
    const spin = document.getElementById('spinner');
    if (isLoading) {
        spin.classList.remove('hidden');
    } else {
        spin.classList.add('hidden');
    }
}

function search() {
    spinner(true);
    const search = document.getElementById('search');
    const innerSearch = search.value;
    console.log(innerSearch);
    mainData(innerSearch);
}
