const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = monthArr[newDate.getMonth()];
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
};

export default formatDate;