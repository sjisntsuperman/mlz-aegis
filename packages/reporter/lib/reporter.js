'use strict';

class reporter{
    constructor(options) {
        this.report_url = options.report_url||'';
        this.init();
    }

    request(monitorId, params){
        let query = '';
        const arr = Object.entries(params).map(item=>{
            const [key, value] = item;
            return `${key}=${value}`;
        });
        query += arr.join('&');
        query +=monitorId?'&monitorId='+monitorId:'';

        //sendBacon
        const img = new Image();
        img.crossOrigin = true;
        img.src = `${this.report_url}?${query}`
    };

    monitor(monitorId, params){
        // 发送请求
        const url = this.report_url;
        this.request(monitorId, params);
    }

    init() {
        console.log(window, window.onerror)
        if(window){
            window.onerror =  (a,b,c,d)=>{
                this.monitor(1, {
                    a,b,c,d
                })
            }
            window.addEventListener('unhandledrejection',  (a,b,c,d)=>{
                this.monitor(1, {
                    a,b,c,d
                })
            })
        }

    }
}
