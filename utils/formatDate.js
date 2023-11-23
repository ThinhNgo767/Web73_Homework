const formatDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formatDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} - ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  return formatDate;
};

module.exports = formatDate
