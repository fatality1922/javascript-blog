'use strict';

//zapisanie ustawien skryptu

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optAuthorsListSelector = '.list .authors',
    optArticleAuthorSelector = '.post-author',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function (event) {
    event.preventDefault();
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
    titleList.innerHTML = '';

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
        params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }
    return params;
};

const calculateTagClass = function (count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return classNumber;
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
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');

        /* split tags into array */

        const articleTagsArray = articleTags.split(' ');
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

        /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

        /* [NEW] generate code of a link and add it to allTagsHTML */
        const counterClass = calculateTagClass(allTags[tag], tagsParams);
        const tagLinkHTML = `<li><a href="#tag-${tag}" class="tag-size-${counterClass}">${tag} </a></li> `;
        allTagsHTML += tagLinkHTML;
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
    generateTitleLinks('[data-tags~="' + tag + '"]');
};


const addClickListenersToTags = function () {
    /* find all links to tags */

    const links = document.querySelectorAll('[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let link of links) {
        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
};

addClickListenersToTags();



function generateAuthors() {
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find author wrapper */
        const authorWrapper = article.querySelector(optArticleAuthorSelector);
        console.log(authorWrapper);
        /* make html variable with empty string */
        let html = '';
        /* get author from data-author attribute */
        const author = article.getAttribute('data-author');
        console.log(author);

        /* generate HTML of the link */
        const linkHTML =
            '<li><a href="#author-' +
            author +
            '"><span>' +
            author +
            '</span></a></li>';
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);
        /* [NEW] check if this link is NOT already in allAuthors */
        if (!allAuthors[author]) {
            /* [NEW] add generated code to allTags array */
            allAuthors[author] = 1;
        } else {
            allAuthors[author]++;
        }
        /* insert HTML of all the links into the author wrapper */
        authorWrapper.innerHTML = html;
        console.log(authorWrapper.innerHTML);

        /* END LOOP: for every article: */

        /* [NEW] find list of authors in right column */
        const authorList = document.querySelector('.authors.list');
        /* [NEW] create variable for all links HTML code */
        let allAuthorsHTML = '';
        /* [NEW] START LOOP: for each author in allAuthors: */
        for (let author in allAuthors) {
            /* [NEW] generate code of a link and add it to allAuthorsHTML */
            const authorLinkHTML =
                '<li><a href="#author-' +
                author +
                '">' +
                author +
                ' ' +
                allAuthors[author] +
                '</a></li>';
            allAuthorsHTML += authorLinkHTML;
            /* [NEW] add html from allAutors to tagList */
            authorList.innerHTML = allAuthorsHTML;
            console.log('authorList.innerHTML', authorList.innerHTML);
        }
    }
}



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
    const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorsLinks) {
        /* remove class active */
        activeAuthorLink.classList.remove('active');
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorsLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let authorLink of authorsLinks) {
        /* add class active */
        authorLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
    console.log(author);
};


const addClickListenersToAuthors = function () {
    /* find all links to tags */

    const allAuthorsLinks = document.querySelectorAll('[href^="#author-"]');

    /* START LOOP: for each link */
    for (let allAuthorLink of allAuthorsLinks) {
        /* add tagClickHandler as event listener for that link */
        allAuthorLink.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }
};

addClickListenersToAuthors();
