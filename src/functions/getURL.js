export default function getURL(options) {
    let url = `https://opentdb.com/api.php?`;
    url += `amount=` + (options.numOfQuestions * options.numOfTeams);
    if(options.category.value !== "0"){
        url += `&category=` + options.category;
    }
    if(options.difficulty.value !== ""){
        url += `&difficulty=` + options.difficulty;
    }
    if(options.questionType.value !== ""){
        url += `&type=` + options.questionType;
    }
    return url;
}
