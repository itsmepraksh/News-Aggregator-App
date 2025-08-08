
import { getData } from "./module/finalData.js";



let searchInp = document.querySelector("input")
let form = document.querySelector("form")
let newsContainer = document.querySelector("#news-box")
let category = document.querySelector("#category")

// console.dir(category)
let selectedCategory = "general";

category.addEventListener("click", (e) => {
    // console.log(e.target.id)

    if (e.target.id) {
        selectedCategory = e.target.id;
        newsContainer.innerHTML = "";
        dataCall(selectedCategory)

    }
})






let newsData = [] 

async function dataCall(categoryName = "general") {
    newsData = await getData(selectedCategory)
    renderNews(newsData)
}


function renderNews(newsData) {

    newsContainer.innerHTML = "";
    // console.log(newsData)
    if (newsData === null) {
        newsContainer.innerHTML = `<h1>No data found !</h1>`
        searchInp.value = ""
    } else {
        newsData.slice(0, 10).forEach((news) => {
            // console.log(news)
            searchInp.value = ""
            let newsArticle = document.createElement('div')
            newsArticle.setAttribute('id', 'newsArticle')
            newsArticle.setAttribute('class', ' w-full md:w-[48%] xl:w-[30%]')



            newsArticle.innerHTML =
                `
                <img class="h-48 w-full object-cover rounded-b-lg" src="${news.urlToImage}" alt="something got wrong..." >
                <a class="truncate text-xs overflow-x-hidden w-96 cursor hover:underline" href="${news.url}">Source : ${news.source.name}</a>
                <h3 class="py-2 font-medium"> ${news.title}</h3>
                <div class="flex justify-between text-sm  font-medium">
                    <p>Author: ${news.author}</p>
                    <p class="text-xs">${news.publishedAt.slice(0, 10)} | ${news.publishedAt.slice(11, 19)}</p>
                </div>
                <div id="description" class="text-sm font-thin text-zinc-800">
                    ${news.description}
                </div>

                <div id="read-full-content" class="truncate text-xs py-2">
                    <a href="${news.url}" class="text-sm font-medium underline pointer ">read full content</a><br/> ${news.content}
                </div>
            `


            newsContainer.appendChild(newsArticle)
        })

    }




}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let searchKeyword = searchInp.value.toLowerCase();

    if (searchKeyword.length > 0) {
        let filteredData = newsData.filter((miniNews) => {
            return miniNews.title.toLowerCase().includes(searchKeyword) || miniNews.description.toLowerCase().includes(searchKeyword)
        })


        // console.log(filteredData.length) 

        filteredData.length > 0 ? renderNews(filteredData) : renderNews(null);
    } else {
        renderNews(newsData)
    }
})

dataCall()
