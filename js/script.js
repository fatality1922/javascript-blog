'use strict';

//zapisanie ustawien skryptu

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function (event) {
    event.preventDefault(); //wylacza predefiniowane ustawienia eventow
    const clickedElement = this;

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
};




function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* get the title from the title element */

        /* create HTML of the link */
        //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; //???
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

        /* insert link into titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }


    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();

//modul7

const generateTags = function () {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
        // const articleId = article.getAttribute('id');

        /* find tags wrapper */
        const tagWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');

        /* split tags into array */
        const articleTagsArray = articleTags.split('   ');

        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            /* generate HTML of the link */
            const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            /* add generated code to html variable */
            html = html + tagLink;

            html = html + linkHTML;
            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        tagWrapper.innerHTML = html;
        /* END LOOP: for every article: */
    }
};

generateTags();

function tagClickHandler(event) {
    console.log('ags');
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = document.querySelector(href);
    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
}


function addClickListenersToTags() {
    /* find all links to tags */

    const links = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(links);
    /* START LOOP: for each link */
    for (let link of links) {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

/*
// event.preventDefault(); //wylacza predefiniowane ustawienia eventow
// const clickedElement = this;
// // console.log('clickedElement (with plus): ' + clickedElement);
// // console.log(event);

// /* [DONE] remove class 'active' from all article links  */
// const activeLinks = document.querySelectorAll('.titles a.active');
// for (let activeLink of activeLinks) {
//     activeLink.classList.remove('active'); 
// }
// /* [Done] add class 'active' to the clicked link */
// clickedElement.classList.add('active');

// /* [DONE] remove class 'active' from all articles */
// const activeArticles = document.querySelectorAll('.post.active');
// for (let activeArticle of activeArticles) {
//     activeArticle.classList.remove('active');
// }
// /* [DONE] get 'href' attribute from the clicked link */
// const articleSelector = clickedElement.getAttribute('href');

// /* [DONE] find the correct article using the selector (value of 'href' attribute) */
// const targetArticle = document.querySelector(articleSelector); 
// //console.log(targetArticle);

// /* [DONE] add class 'active' to the correct article */
// targetArticle.classList.add('active');
// };
//*/