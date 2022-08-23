const dateFixer = (date) => {
    const addZero = (data) => {
      return data < 10 ? '0' + data : data;
    }
    
    const oldDate = new Date(`${date}`);

    const newDate = {
      time: `${addZero(oldDate.getHours())}:${addZero(oldDate.getMinutes())}`,
      date: `${addZero(oldDate.getDate())}/${addZero(oldDate.getMonth() + 1)}/${oldDate.getFullYear()}`
    }

    return `${newDate.date} ${newDate.time}`;
  }

  export default dateFixer;