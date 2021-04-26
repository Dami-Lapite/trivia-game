export default function getURL(options) {
    let url = `https://opentdb.com/api.php?`;
    if((options.NumOfQuestions.value !== "") && (!isNaN(options.NumOfQuestions.value))){
        url += `amount=` + options.NumOfQuestions.value;
    }else{
        url += `amount=10`;
    }
    if(options.category.value !== "0"){
        url += `&category=` + options.category.value;
    }
    if(options.difficulty.value !== "0"){
        url += `&difficulty=` + options.difficulty.value;
    }
    if(options.questionType.value !== "0"){
        url += `&type=` + options.questionType.value;
    }
    return url;
}
