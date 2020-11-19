'use strict';

//zapisanie ustawien skryptu
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

const titleClickHandler = function (event) {
    event.preventDefault(); //wylacza predefiniowane ustawienia eventow
    const clickedElement = this;
    // console.log('clickedElement (with plus): ' + clickedElement);
    // console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active'); 
    }
    /* [Done] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector); 
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
}





function generateTitleLinks() { 

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute("id");
        console.log(articleId);

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* get the title from the title element */

        /* create HTML of the link */
        //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; //???
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

        console.log(linkHTML);
        /* insert link into titleList */
        titleList.innerHTML += linkHTML;
    }


    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();

