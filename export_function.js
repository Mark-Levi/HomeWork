export function getListComments(comment) {
    return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
        id:comment.id
    }
}
export function initLikeListener(renderComments,listComments) {
    // Запускаем обработчик кнопок  Like
    const likesElements = document.querySelectorAll('[data-likes]');
    for (const likeElement of likesElements) {

        likeElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const id = likeElement.dataset.id;
            if (listComments[id].isLiked) {
                listComments[id].likes -= (listComments[id].likes) ? 1 : 0;
                listComments[id].isLiked = false;
            } else {
                listComments[id].likes += 1;
                listComments[id].isLiked = true;
            }
            let TextAreaElement = document.getElementById("add-form-text");
            const oldText = TextAreaElement.value;
            renderComments(listComments);
            TextAreaElement = document.getElementById("add-form-text");
            TextAreaElement.value = oldText;
        });

    }
};

export function initCommentListener (listComments) {
    // Запускаем обработчик клика на комментарии. Формируем ответ на комментарий
    const commentsElements = document.querySelectorAll(".comment");
    const TextAreaElement = document.getElementById("add-form-text");

    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", (event) => {
            const id = commentElement.dataset.id;
            TextAreaElement.value =
                `BEGIN_QUOTE${"\n>" + listComments[id].text + "\n" + listComments[id].name + "\n"}END_QUOTE` + "\n";
        });
    }
};