/**
 * 判断浏览器是否包含某个事件
 * @param {属性名} eventName 
 */
export const detectEventSupport = (eventName) => {
    let tempElement = document.createElement('div'),
        isSupported;
    eventName = 'on' + eventName;
    isSupported = (eventName in tempElement); // 使用第一种方式
    // 如果第一种方式行不通，那就来看看它是不是已知事件类型
    if(!isSupported) {
        tempElement.setAttribute(eventName, 'xxx');
        isSupported = typeof tempElement[eventName] === 'function';
    }
    // 清除掉动态创建的元素，以便内存回收
    tempElement = null;
    // 返回检测结果
    return isSupported;
}

/**
 * 矩形碰撞
 * @param  {[type]} rect1 [description]
 * @param  {[type]} rect2 [description]
 * @return {[type]}       [description]
 */
export const rectImpact = (rect1, rect2) => {
    let t1 = rect1.offsetTop;  
    let l1 = rect1.offsetLeft;  
    let r1 = rect1.offsetLeft + rect1.offsetWidth;  
    let b1 = rect1.offsetTop + rect1.offsetHeight;  

    let t2 = rect2.offsetTop;  
    let l2 = rect2.offsetLeft;  
    let r2 = rect2.offsetLeft + rect2.offsetWidth;  
    let b2 = rect2.offsetTop + rect2.offsetHeight; 

    if(b1<t2 || l1>r2 || t1>b2 || r1<l2){// 表示没碰上  
        return false
    }else{  
        return true
    }  
}


export const getScript = (files) => {
    // var _doc = document.getElementsByTagName('head')[0];
    // var js = document.createElement('script');
    // js.setAttribute('type', 'text/javascript');
    // js.setAttribute('src', file);
    // _doc.appendChild(js);

    // if (!/*@cc_on!@*/0) { //if not IE
    //     //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
    //     js.onload = function () {
    //         alert('Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload');
    //     }
    // } else {
    //     //IE6、IE7 support js.onreadystatechange
    //     js.onreadystatechange = function () {
    //         if (js.readyState == 'loaded' || js.readyState == 'complete') {
    //             alert('IE6、IE7 support js.onreadystatechange');
    //         }
    //     }
    // }

    // return false;
}
