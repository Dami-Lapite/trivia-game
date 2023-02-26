# [LITTLE-TRIVIA-GAME](https://littletriviagame.app/)

Little-trivia-game is a single page application that allows users set the game parameters such as number of questions, question category, difficulty, and question type.
The user may also select a 2-player mode, enable a 20-second timer
At the end of each game, a score tally for each player is displayed based on how many questions were answered correctly.

I used data from a [Trivia API](https://opentdb.com/api_config.php)

### TIMER

The timer is implemented using the `useRef`, `useState`, `useEffect` react hooks

To set timer, update the seconds value in deadline and useEffect.

```
const getDeadTime = () => {
    let deadline = new Date();

    // Adjust deadline to current time + (countdown duration)
    deadline.setSeconds(deadline.getSeconds() + 20);
    return deadline;
};

useEffect(() => {
    const timer = setTimeout(() => {
        props.parentCallBack();
    }, 20000);
    return () => clearTimeout(timer);
}, []);
```

### To install all dependecies

```
npm install
```
