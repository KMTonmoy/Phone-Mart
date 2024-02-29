const loadPhone = async (searchText = "13", isShowAll) => {
    loadSpinner(true);

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => {
            const phones = data.data;
            displayPhones(phones, isShowAll);
            loadSpinner(false);
        })

}

const displayPhones = (phones, isShowAll) => {
    const itemContainer = document.getElementById("itemContainer");
    const showC = document.getElementById("showC");
    itemContainer.innerHTML = '';

    if (phones.length > 12 && !isShowAll) {
        showC.classList.remove("hidden");
    } else {
        showC.classList.add("hidden");
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    } else {
        showC.classList.add("hidden");
    }

    phones.forEach(phone => {
        itemContainer.innerHTML += `
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src=${phone.image} alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body ">
                <h2 class="card-title">Brand${phone.brand}</h2>
                <h2 class="text-sm">Model: ${phone.slug}</h2>
                

                    <p>There are many variations of passages of available, but the majority have suffered</p>
                    <div class="card-actions">
                        
                        <button class="btn btn-primary w-full" onclick="phone_Deatil_Modal.showModal();
                        handelDetails('${phone.slug}')">Details</button>
                    </div>
                </div>
            </div>
        `;
    });
}

const searchOperation = (isShowAll) => {
    const inputBox = document.getElementById("inputBox");
    const searchText = inputBox.value;
    loadPhone(searchText, isShowAll);
}

const showMore = () => {
    searchOperation(true);
}

const loadSpinner = (isLoading) => {
    const loadSpinn = document.getElementById("loadSpinner");
    if (isLoading === true) {
        loadSpinn.classList.remove('hidden');
    } else {
        loadSpinn.classList.add('hidden');
    }
}

const handelDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    console.log(data)
    console.log(id)
    showDetails(data.data)
}

const showDetails = (phoneData) => {
    const p1 = document.getElementById("p1");
    p1.innerText = `Storage: ${phoneData.mainFeatures.storage}`;

    const p2 = document.getElementById("p2");
    p2.innerText = `Display Size: ${phoneData.mainFeatures.displaySize}`;

    const p3 = document.getElementById("p3");
    p3.innerText = `Chipset: ${phoneData.mainFeatures.chipSet}`;

    const p4 = document.getElementById("p4");
    p4.innerText = `Memory: ${phoneData.mainFeatures.memory}`;

    const p5 = document.getElementById("p5");
    p5.innerText = `Slug: ${phoneData.slug}`;

    const p6 = document.getElementById("p6");
    p6.innerText = `Release Date: ${phoneData.releaseDate}`;

    const p7 = document.getElementById("p7");
    p7.innerText = `GPS: ${phoneData.others.GPS}`;

    const imgConta = document.getElementById("imgConta");
    imgConta.innerHTML = `
        <img src="${phoneData.image}" alt="Phone Image">
    `;
};
 
loadPhone()



