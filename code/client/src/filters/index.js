export const parseTime = (time, cFormat) => {
    if (arguments.length === 0) {
        return null
    }
    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(time)
    }


    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export const formatDateTime = time => {
    let now = new Date(),
        t = now - new Date(time)

    let m = 1000*60,
        h = 1000*60*60
    if (t > h*48) {
        return time
    }else if(t > 24*h) {
        return '1天前'
    }else if(t >= h) {
        return Math.floor(t/h)+'小时前'
    }else if(t >= m) {
        return Math.floor(t/m)+'分钟前'
    }else{
        return '刚刚'
    }
    
}

export const formatMusicTime = (time) => {
    if (time < 60) {

        return '00:' + format(time)
    } else {
        var Minute = Math.floor(time / 60);
        var t = time % 60;
        return format(Minute) + ':' + format(t)
    }

    function format(t) {
        return t < 10 ? '0' + t : t
    }
}

