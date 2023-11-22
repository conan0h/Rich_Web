document.addEventListener('DOMContentLoaded', () => {
  const timerElement = document.getElementById('timer');
  const setInitialTimeButton = document.getElementById('setInitialTime');
  const startCountdownButton = document.getElementById('startCountdown');
  const hoursInput = document.getElementById('hours');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');

  const formatTime = (hours, minutes, seconds) => {
    const formatNumber = num => num.toString().padStart(2, '0');
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  const parseTimeToSeconds = (hours, minutes, seconds) => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const countdownState = new rxjs.BehaviorSubject({ running: false, seconds: 0 });

  const countdown$ = countdownState.pipe(
    rxjs.operators.switchMap(({ running, seconds }) =>
      running
        ? rxjs.interval(1000).pipe(
            rxjs.operators.scan(acc => --acc, seconds),
            rxjs.operators.takeWhile(x => x >= 0),
          )
        : rxjs.of(seconds)
    )
  );

  timerElement.style.display = 'none';

  const countdownSubscription = countdown$.subscribe(currentSeconds => {
    const hours = Math.floor(currentSeconds / 3600);
    const minutes = Math.floor((currentSeconds % 3600) / 60);
    const remainingSeconds = currentSeconds % 60;
    timerElement.textContent = formatTime(hours, minutes, remainingSeconds);
  });

  rxjs.fromEvent(setInitialTimeButton, 'click').subscribe(() => {
    const hours = parseInt(hoursInput.value, 10);
    const minutes = parseInt(minutesInput.value, 10);
    const seconds = parseInt(secondsInput.value, 10);

    const newSeconds = parseTimeToSeconds(hours, minutes, seconds);
    countdownState.next({ running: false, seconds: newSeconds });
    timerElement.style.display = 'block';
  });

  let temp = 0;
  let running = false;

  rxjs.fromEvent(startCountdownButton, 'click').subscribe(() => {
    const currentState = countdownState.value;

    countdownState.next({ running: true, seconds: currentState.seconds });
  });

});
