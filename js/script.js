'use strict';

//zapisanie ustawien skryptu

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optArticleAuthorsSelector = '.post-author';

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




const generateTitleLinks = function (customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    //console.log(titleList);
    titleList.innerHTML = ''; //po co to przypisanie skoro consolelogi pokazja to samo
    //console.log(titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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
};
generateTitleLinks();

//modul7

const calculateTagsParams = function (tags) {

    const params = { min: 99999, max: 0 };
    for (let tag in tags) {
        
        params.max = Math.max(tags[tag], params.max); 
        params.min = tags[tag] < params.min ? tags[tag] : params.min;//mozna na normalych ifach, te dla praktyki dalem
    }
    return params;
};

const generateTags = function () {
    
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */
        let html = ''; //dlaczego deklaracja tutaj, a nie popzniej

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags'); //dlaczego nie chcialo dzialac z document?

        /* split tags into array */

        const articleTagsArray = articleTags.split(' ');
        //console.log(articleTagsArray);
        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {

            /* generate HTML of the link */
            const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li> `;

            /* add generated code to html variable */
            html = linkHTML;
            tagsWrapper.insertAdjacentHTML('beforeend', html);

            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags[tag]) {
                /* [NEW] add tag to allTags object */
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */
        //dlaczego w szablonie to jest po zakonczeniu petli, skoro tak nie dziala
        /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

        /* [NEW] generate code of a link and add it to allTagsHTML */
        allTagsHTML += `<li><a href="#tag-${tag}">${tag}</a> ` + ' (' + allTags[tag] + ') </li>';
        /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

};

generateTags();

const tagClickHandler = function (event) {

    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
        /* remove class active */
        activeTag.classList.remove('active');
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalTags = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let equalTag of equalTags) {
        /* add class active */
        equalTag.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]'); //co oznaczają tu nawiasy kwadratowe
};


const addClickListenersToTags = function () {
    /* find all links to tags */

    const links = document.querySelectorAll('[href^="#tag-"]'); //dlaczego tu mialo byc a.active..

    /* START LOOP: for each link */
    for (let link of links) {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
};

addClickListenersToTags();



const generateAuthors = function () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

        /* find authors wrapper */
        const authorsWrapper = article.querySelector(optArticleAuthorsSelector);

        /* make html variable with empty string */

        /* get tags from data-tags attribute */
        const articleAuthor = article.getAttribute('data-author');


        /* generate HTML of the link */
        const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a> `;

        /* insert HTML of all the links into the tags wrapper */
        authorsWrapper.insertAdjacentHTML('beforeend', linkHTML);
        /* END LOOP: for every article: */
    }
};

generateAuthors();

const authorClickHandler = function (event) {

    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
        /* remove class active */
        activeAuthor.classList.remove('active');
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalAuthors = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let equalAuthor of equalAuthors) {
        /* add class active */
        equalAuthor.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
};


const addClickListenersToAuthors = function () {
    /* find all links to tags */

    const links = document.querySelectorAll('[href^="#author-"]');

    /* START LOOP: for each link */
    for (let link of links) {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }
};

addClickListenersToAuthors();
