export const difTime = (previousTime) => {
  const today = new Date();
  const timeValue = new Date(previousTime);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const BACKEND_HOST = "http://localhost:8000/";

export const scrollPage = (e, pageNum, maxPage, cb) => {
  if (pageNum <= maxPage) {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    if (clientHeight + scrollTop + 600 >= scrollHeight) {
      console.log(clientHeight);
      console.log(scrollTop);
      console.log(scrollHeight);
      cb();
    }
  }
};
