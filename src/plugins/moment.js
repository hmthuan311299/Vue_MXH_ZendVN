import moment from 'moment'

const getTimePost = (time = 1 / 6 / 2021) => {
    moment.locale('vi')
    return moment(time).fromNow();
}
export {
    getTimePost
}