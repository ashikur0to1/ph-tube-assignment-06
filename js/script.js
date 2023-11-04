const navBar = document.getElementById("nav-bar");
const logo = document.createElement("img");
logo.src = "../images/Logo.png";
navBar.appendChild(logo);
const sortByViewButton = document.createElement("button");
sortByViewButton.innerHTML = `

    <button>Sort By View</button>

`;
navBar.appendChild(sortByViewButton);
sortByViewButton.classList.add("sort-by-view-button");
// sortByViewButton.style.backgroundColor = "#25252533";
const blogButtonAnchorTag = document.createElement("a");
blogButtonAnchorTag.setAttribute("href", "../blog.html");
blogButtonAnchorTag.setAttribute("target", "_blank")
blogButtonAnchorTag.innerHTML = `

    <button class="blog-button">Blog</button>

`;

navBar.appendChild(blogButtonAnchorTag);
const horizontalLineDiv = document.getElementById("horizontal-line-div");
const horizontalLine = document.createElement("hr");
horizontalLineDiv.appendChild(horizontalLine);
horizontalLine.classList.add("horizontal-line");

const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const categoryButtonContainer = document.getElementById("category-button-container");
    data.data.forEach((category) => {
        const categoryButtonDiv = document.createElement("div");
        categoryButtonDiv.innerHTML = `

        <button id="category-btn" onclick="handleCategoryWithIndividualId('${category.category_id}')" class="category-button">${category.category}</button>

       `
       categoryButtonContainer.appendChild(categoryButtonDiv);
    });
}

const handleCategoryWithIndividualId = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const noDataContainer = document.getElementById("no-data-container");
    noDataContainer.innerHTML = "";
    if(categoryId === "1005"){
        const noDataContainer = document.getElementById("no-data-container");
        const NoDataImage = document.createElement("img");
        NoDataImage.src = "../images/Icon.png";
        noDataContainer.appendChild(NoDataImage);
        const NoDataText = document.createElement("h1");
        NoDataText.innerHTML = `
        
        <h1 class="text-6xl mt-12">Oops!! Sorry, There is no content here</h1>
        
        `;
        noDataContainer.appendChild(NoDataText);
    }

    data.data.forEach((content) => {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="w-[368px] pt-12 bg-base-100">
        <div class="time-container-div relative">
        <img class="w-full h-[200px]  rounded-lg" src=${content.thumbnail} alt="" />
        ${content.others.posted_date?
            `<div class="time-container absolute">
                <p>${toHoursAndMinutes(content.others.posted_date)}</p>
             </div>   
            `
            :""}
        </div>
        <div class="flex gap-4 pt-5">
            <img class="w-14 h-14 rounded-full" src=${content.authors[0].profile_picture} alt="" srcset="">
            <h1 class="card-title" >${content.title}</h1>
        </div>
        <div class="flex px-[70px] gap-[9px] pt-[9px]">
            <p class="name-and-views">${content.authors[0].profile_name}</p>
            ${content.authors[0].verified?`<img src="./images/blue-badge.png" alt=""></img>`:""}
        </div>
        <p class="px-[70px] name-and-views pt-[10px]">${content.others.views?content.others.views:"No Views"} views</p>
        </div>
        `
        cardContainer.appendChild(cardDiv);
        
    })
}

handleCategory();

handleCategoryWithIndividualId(1000);

function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return hours + " hrs " + minutes + " min ago ";
  }