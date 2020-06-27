export const getHourMin = Dtx => {
  return `${`0${Dtx.getHours()}`.slice(-2)}:${`0${Dtx.getMinutes()}`.slice(
    -2
  )}`;
};

export const milisegToHourSeg = miliSeg => {
  const miliSegInMin = 1000 * 60;
  const miliSegInHour = miliSegInMin * 60;
  const miliSegInDay = miliSegInHour * 24;
  let dd = '';
  let hh = '';
  let mm = '';
  let mSeg = miliSeg;
  if (mSeg === 0) {
    hh = '00';
    mm = '00';
  } else {
    if (Math.floor(mSeg / miliSegInDay) !== 0) {
      const nDays = Math.floor(mSeg / miliSegInDay);
      dd = `${nDays.toString()}:`;
      mSeg -= nDays * miliSegInDay;
    }
    if (Math.floor(mSeg / miliSegInHour) === 0) {
      hh = '00';
      mm = `0${Math.ceil(mSeg / miliSegInMin).toString()}`.slice(-2);
    } else {
      hh = `0${Math.floor(mSeg / miliSegInHour).toString()}`.slice(-2);
      mm = `0${Math.ceil(
        Math.floor(mSeg % miliSegInHour) / miliSegInMin
      )}`.slice(-2);
    }
  }
  return `${dd}${hh}:${mm}`;
};
