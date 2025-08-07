
import { getData } from "./module/finalData.js";



let newsContainer = document.querySelector("#news-box")
 
 

async function dataCall() {
    let newsData = await getData()
    // console.log(newsData)

    newsData.slice(0, 10).forEach((news) => {
        console.log(news)
        let newsArticle = document.createElement('div')
        newsArticle.setAttribute('id', 'newsArticle')
        newsArticle.setAttribute('class', ' w-full md:w-[48%] xl:w-[30%]')

        newsArticle.innerHTML =
            `
                <img class="h-48 w-full object-cover rounded-b-lg" src="${news.urlToImage}">
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

dataCall()