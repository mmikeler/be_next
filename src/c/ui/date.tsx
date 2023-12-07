import moment from "moment";
moment.locale('ru-RU')

export function DDate({ date }: any) {
    if (date) {
        return moment(date).format('DD.MM.y H:m')
    }
    else {
        return null
    }
}